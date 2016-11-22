import joi from 'joi'
import User from '../models/user'
import {validate} from '../common/helpers'

export async function getUserByUsername(ctx) {
  const username = ctx.params.username
  const user = await User
    .findOne({username})
    .select('username createdAt updatedAt avatar shotsCount commentsCount followersCount followingsCount')
    .exec()
  if (user) {
    ctx.body = user
  } else {
    ctx.throw(404, 'user not found')
  }
}

export async function updateUserProfiles(ctx) {
  const {sub} = ctx.state.user
  // remove undefined or null fields of request body
  let bodyNotEmpty = ctx.request.bodyNotEmpty
  try {
    bodyNotEmpty = await validate(bodyNotEmpty, joi.object().keys({
      avatar: joi.string(),
      signature: joi.string(),
      website: joi.string(),
      birthday: joi.date(),
      gender: joi.string()
    }))
    const user = await User
      .findOneAndUpdate({_id: sub}, {$set: bodyNotEmpty}, {new: true})
      .exec()
    if (user) {
      ctx.body = {user}
    } else {
      ctx.throw(404, 'user not found')
    }
  } catch (err) {
    ctx.throw(403, err)
  }
}
