import joi from 'joi'
import User from '../models/user'
import Shot from '../models/shot'
import Tag from '../models/tag'
import {validate} from '../common/helpers'

export async function addShot(ctx) {
  const userId = ctx.state.user.sub
  // used for updating shot
  const shotId = ctx.request.body.id

  let shotData = {
    images: ctx.request.body.images,
    tags: ctx.request.body.tags || []
  }

  try {
    shotData = await validate(shotData, joi.object().keys({
      images: joi.array().items(joi.object().keys({
        url: joi.string().required(),
        description: joi.any().optional(),
        width: joi.number().required(),
        height: joi.number().required()
      }).required()).required(),
      tags: joi.array().items(joi.string())
    }))
    shotData.user = userId

    // tags: added tags
    if (shotData.tags.length > 0) {
      shotData.tags = await Promise.all(shotData.tags.map(async tagName => {
        // find an existing tag and update its count
        const tag = await Tag.findOneAndUpdate({name: tagName}, {
          $inc: {count: 1}
        }).populate('user', 'username avatar').exec()
        if (tag) {
          return tag
        } else {
          // tag does not exist, create a new one
          const newTag = new Tag({name: tagName, user: user})
          return await newTag.save()
        }
      }))
    }
    // TODO: deleredTags
    // decrease tag count for deletedTags in the shot
    let savedShot
    console.log(savedShot);

    if (shotId) {
      savedShot = await Shot
        .findOneAndUpdate({_id: shotId, user: userId}, shotData)
        .exec()
    } else {
      const shot = new Shot(shotData)
      savedShot = await shot.save()
      const populated = await Shot.populate(savedShot, {
        path: 'user',
        select: 'username avatar'
      })
      io.emit('new-shot', populated)
      // inc shotsComment in user schema
      await User.findOneAndUpdate({_id: userId}, {
        $inc: {shotsCount: 1}
      }).exec()
    }

    ctx.body = savedShot
  } catch (e) {
    ctx.status = 403
    console.log(e.stack)
    ctx.body = e
  }
}

export async function getShots(ctx) {
  const {limit = 10, before, after} = ctx.query
  const {username} = ctx.params

  const query = {}
  if (before) {
    query.createdAt = {$lt: new Date(before)}
  }
  if (after) {
    query.createdAt = {$gt: new Date(after)}
  }

  if (username) {
    const user = await User.findOne({username}).exec()
    if (!user) {
      ctx.status = 404
      ctx.body = 'user not found'
      return
    }
    query.user = user
  }

  const shots = await Shot
    .find(query)
    .sort('-createdAt')
    .limit(parseInt(limit, 10))
    .populate('user', 'username avatar')
    .exec()

  ctx.body = shots
}

export async function getShotById(ctx) {
  const {id} = ctx.params

  const shot = await Shot
    .findOne({_id: id})
    .populate('user', 'username avatar')
    .exec()

  ctx.body = shot
}
