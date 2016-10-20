import User from '../models/user'

export async function getUserByUsername(ctx) {
  const username = ctx.params.username
  const user = await User
    .findOne({username})
    .select('username createdAt updatedAt avatar shotsCount commentsCount followersCount followingsCount')
    .exec()
  if (user) {
    ctx.body = user
  } else {
    ctx.status = 404
    ctx.body = 'user not found'
  }
}
