import Shot from '../models/shot'
import {checkShots} from '../utils'

export default async function search(ctx) {
  const {limit = 10, content, before, after} = ctx.request.query
  const {sub} = ctx.state.user || {}

  let query = {
    content: {$regex: content}
  }
  if (before) {
    query.createdAt = {$lt: new Date(before)}
  }
  if (after) {
    query.createdAt = {$gt: new Date(after)}
  }

  const shots = await Shot
    .find(query)
    .sort('-createdAt')
    .limit(parseInt(limit, 10))
    .populate('user', 'username avatar')
    .populate('replyTo', 'username avatar')
    .exec()

  ctx.body = checkShots(shots, sub)
}
