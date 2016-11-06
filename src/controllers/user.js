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
    ctx.throws(404, 'user not found')
  }
}
