import {
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull
}from 'graphql'
import {UserType} from '../types'
import {User} from '../../models'

export const user = {
  type: UserType,
  args: {
    username: {
      type: new NonNull(StringType)
    }
  },
  resolve(root, {username}){
    return User.findOne({username}).exec()
  }
}
