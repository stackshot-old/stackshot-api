import mongoose, {Schema} from 'mongoose'
import timestamp from 'mongoose-timestamp'

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  images: {
    type: Array
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  commentsCount: {
    type: Number,
    default: 0
  },
  likesCount: {
    type: Number,
    default: 0
  }
})

schema.plugin(timestamp)

export default mongoose.model('Shot', schema)
