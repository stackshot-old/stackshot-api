import {
  GraphQLInt as Int,
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull
} from 'graphql'

export default new ObjectType({
  name: 'User',
  fields: {
    id: {type: new NonNull(ID)},
    username: {type: StringType},
    email: {type: StringType},
    avatar: {type: StringType},
    password: {type: StringType},
    token: {type: StringType},
    shotsCount: {type: Int},
    commentsCount: {type: Int},
    followersCount: {type: Int},
    followingsCount: { type: Int}
  }
})
