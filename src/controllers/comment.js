import joi from 'joi'
import Comment from '../models/comment'
import Shot from '../models/shot'
import {validate} from '../common/helpers'
import mongoose from 'mongoose'

export async function getReplys(ctx) {
  const {limit = 10, before, after} = ctx.query
  const {sub} = ctx.state.user

  const query = { replyTo: mongoose.Types.ObjectId(sub) }
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

  const query = { shot: mongoose.Types.ObjectId(shot) }
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
  const {sub} = ctx.state.user
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

    // io.emit('new-comment', populated)
    // inc shotsComment in user schema
    await Shot.findOneAndUpdate({_id: shot}, {
      $inc: {commentsCount: 1}
    }, {new: true}).exec()

    const populated = await Comment.populate(savedComment, [
      {path: 'user', select: 'username avatar'},
      {path: 'shot', select: '_id'},
      {path: 'replyTo', select: 'username avatar'}
    ])

    ctx.body = populated
  } catch (err) {
    ctx.throws(403, err)
  }
}
