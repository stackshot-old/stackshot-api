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
    const comment = new Comment(commentData)
    savedComment = await comment.save()
    const populated = await Comment.populate(savedComment, [
      { path: 'user', select: 'username avatar' },
      { path: 'parent', select: '_id'},
      { path: 'replyTo', select: 'username avatar'}
    ])
    io.emit('new-comment', populated)
    // inc shotsComment in user schema
    const shot = await Shot.findOneAndUpdate({_id: parent},{ $push:{ latestComment: { $each:[savedComment._id], $slice: -5 } }, $inc: {commentsCount: 1 }}, {new: true}).exec()

    ctx.body = {shot: shot, comment: savedComment}
  } catch (e) {
    ctx.status = 403
    console.log(e.stack)
    ctx.body = e
  }
}
