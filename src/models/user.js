import mongoose, {Schema} from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import timestamp from 'mongoose-timestamp'
import _ from 'lodash'

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  avatar: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  apiKey: {
    type: String
  },
  shotsCount: {
    type: Number,
    default: 0
  },
  gender: {
    type: String
  },
  birthday: {
    type: Date
  },
  website: {
    type: String
  },
  signature: {
    type: String
  },
  commentsCount: {
    type: Number,
    default: 0
  },
  followersCount: {
    type: Number,
    default: 0
  },
  followingsCount: {
    type: Number,
    default: 0
  },
  likedShot: [{
    type: Schema.Types.ObjectId,
    ref: 'Shot'
  }],
  newComments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
})

schema.plugin(uniqueValidator)
schema.plugin(timestamp)

schema.methods.getPublic = function () {
  return _.pick(this, [
    'username',
    'avatar',
    'gender',
    'website',
    'signature',
    'birthday',
    'createdAt',
    'updatedAt',
    '_id'
  ])
}

export default mongoose.model('User', schema)
