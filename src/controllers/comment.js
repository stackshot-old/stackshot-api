import joi from 'joi'
import Comment from '../models/comment'
import Shot from '../models/shot'
import {validate} from '../common/helpers'

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
