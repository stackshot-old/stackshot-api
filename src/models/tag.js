import mongoose, {Schema} from 'mongoose'
import timestamp from 'mongoose-timestamp'

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
})

schema.plugin(timestamp)

export default mongoose.model('Tag', schema)
