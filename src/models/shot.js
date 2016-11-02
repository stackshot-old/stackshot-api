import mongoose, {Schema} from 'mongoose'
import timestamp from 'mongoose-timestamp'

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  commentsCount: {
    type: Number,
    default: 0
  },
  likesCount: {
    type: Number,
    default: 0
  },
  images: {
    type: Array
  },
  latestComment: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  likedUser: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

schema.plugin(timestamp)

export default mongoose.model('Shot', schema)
