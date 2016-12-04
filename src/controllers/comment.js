import joi from 'joi'
import mongoose from 'mongoose'
import Comment from '../models/comment'
import Shot from '../models/shot'
import Message from '../models/message'
import {validate} from '../common/helpers'

export async function getReplys(ctx) {
  const {limit = 10, before, after} = ctx.query

  const sub = ctx.state.user && ctx.state.user.sub
  if (!sub) {
    ctx.throw(401)
  }

  const query = {replyTo: mongoose.Types.ObjectId(sub)} // eslint-disable-line new-cap
  if (before) {
    query.createdAt = {$lt: new Date(before)}
  }
  if (after) {
    query.createdAt = {$gt: new Date(after)}
  }

  const replys = await Comment
    .find(query)
    .sort('createdAt')
    .limit(parseInt(limit, 10))
    .populate('user', 'username avatar')
    .populate('shot', '_id')
    .populate('replyTo', 'username avatar')
    .exec()

  ctx.body = replys
}

export async function getComments(ctx) {
  const {limit = 10, before, after, shot} = ctx.query
  const query = {shot: mongoose.Types.ObjectId(shot)} // eslint-disable-line new-cap
  if (before) {
    query.createdAt = {$lt: new Date(before)}
  }
  if (after) {
    query.createdAt = {$gt: new Date(after)}
  }
  const comments = await Comment
    .find(query)
    .sort('-createdAt')
    .limit(parseInt(limit, 10))
    .populate('user', 'username avatar')
    .populate('shot', '_id')
    .populate('replyTo', 'username avatar')
    .exec()

  ctx.body = comments
}

export async function addComment(ctx) {
  const sub = ctx.state.user && ctx.state.user.sub
  if (!sub) {
    ctx.throw(401)
  }

  const {shot, replyTo, content} = ctx.request.body
  let commentData = {
    content,
    replyTo,
    shot
  }

  try {
    commentData = await validate(commentData, joi.object().keys({
      shot: joi.string().required(),
      content: joi.string(),
      replyTo: joi.string()
    }))
    commentData.user = sub

    const comment = new Comment(commentData)
    const savedComment = await comment.save()

    // inc shotsComment in user schema
    await Shot.findOneAndUpdate({_id: shot}, {
      $inc: {commentsCount: 1}
    }, {new: true}).exec()

    if (replyTo) {
      const existMessage = await Message.findOneAndUpdate({user: replyTo, shot: shot}, {$addToSet: {comments: comment._id}})
      if (!existMessage) {
        const newMessage = new Message({user: replyTo, shot: shot, comments: [comment._id]})
        newMessage.save()
      }
    }

    const populated = await Comment.populate(savedComment, [
      {path: 'user', select: 'username avatar'},
      {path: 'shot', select: '_id'},
      {path: 'replyTo', select: 'username avatar'}
    ])
    ctx.body = populated
  } catch (err) {
    ctx.throw(403, err)
  }
}
