import joi from 'joi'
import User from '../models/user'
import Comment from '../models/comment'
import Shot from '../models/shot'
import {validate} from '../common/helpers'



export async function addComment(ctx) {
  const userId = ctx.state.user.sub
  const {parent, replyTo, content} = ctx.request.body
  let commentData = {
    content,
    replyTo,
    parent
  }

  try {
    commentData = await validate(commentData, joi.object().keys({
      parent: joi.string().required(),
      content: joi.string(),
      replyTo: joi.string()
    }))
    commentData.user = userId

    let savedComment
    const shot = new Comment(commentData)
    savedComment = await shot.save()
    const populated = await Comment.populate(savedComment, [
      { path: 'user', select: 'username avatar' },
      { path: 'parent', select: '_id'},
      { path: 'replyTo', select: 'username avatar'}
    ])
    io.emit('new-comment', populated)
    // inc shotsComment in user schema
    await Shot.findOneAndUpdate({_id: parent},{ $addToSet:{ latestComment: { $each:[savedComment._id], $slice: -7 } }, $inc: {commentsCount: 1 }}).exec()

    ctx.body = savedComment
  } catch (e) {
    ctx.status = 403
    console.log(e.stack)
    ctx.body = e
  }
}
