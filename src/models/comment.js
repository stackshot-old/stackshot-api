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
  shot: {
    type: Schema.Types.ObjectId,
    ref: 'Shot'
  },
  replyTo: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

schema.plugin(timestamp)

export default mongoose.model('Comment', schema)
