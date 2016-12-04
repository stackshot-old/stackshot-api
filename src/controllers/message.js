import mongoose from 'mongoose'
import Message from '../models/message'

export async function getMessages(ctx) {
  const {limit = 10, before, after} = ctx.request.query
  const sub = ctx.state.user && ctx.state.user.sub
  if (!sub) {
    ctx.throw(401)
  }

  let query = {user: mongoose.Types.ObjectId(sub)} // eslint-disable-line new-cap
  if (before) {
    query.createdAt = {$lt: new Date(before)}
  }
  if (after) {
    query.createdAt = {$gt: new Date(after)}
  }
  const messages = await Message
    .find(query)
    .sort('createdAt')
    .limit(parseInt(limit, 10))
    .populate('shot', '_id image content')
    .populate({path: 'comments', select: '_id content user', populate: {path: 'user', select: '_id username avatar'}})
    .exec()

  ctx.body = messages
}
