import mongoose, {Schema} from 'mongoose'
import timestamp from 'mongoose-timestamp'

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  shot: {
    type: Schema.Types.ObjectId,
    ref: 'Shot'
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
})

schema.plugin(timestamp)

export default mongoose.model('Message', schema)
