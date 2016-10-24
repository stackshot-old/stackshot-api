import {
  GraphQLID as ID,
  GraphQLNonNull as NonNull
}from 'graphql'
import {UserType} from '../types'
import {User} from '../../models'

export default {
  type: UserType,
  args: {
    id: {
      type: new NonNull(ID)
    }
  },
  resolve(root, {id}){
    return User.findById(id).exec()
  }
}
