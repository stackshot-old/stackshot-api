import joi from 'joi'
import mongoose from 'mongoose'
import Comment from '../models/comment'
import User from '../models/user'
import Shot from '../models/shot'
import {validate} from '../common/helpers'

export async function getReplys(ctx) {
  const {limit = 10, before, after} = ctx.query

  const sub = ctx.state.user && ctx.state.user.sub
  if(!sub){
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
  if(!sub){
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
    const { user } = await Shot.findOneAndUpdate({_id: shot}, {
      $inc: {commentsCount: 1}
    }, {new: true}).exec()

    // save and send new message by replyTo
    if(replyTo){
      await User.findOneAndUpdate({_id: replyTo}, {
        $addToSet: {newComments: savedComment._id}
      })
    }
    // save and send new message by comment
    // change "user" to "author" maybe more readable
    if(user && replyTo !== user){
      await User.findOneAndUpdate({_id: user}, {
        $addToSet: {newComments: savedComment._id}
      })
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
