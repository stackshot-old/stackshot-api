import {
  GraphQLObjectType as ObjectType,
  GraphQLSchema as Schema
} from 'graphql'
import {signup, signin} from './mutations'
import {user} from './queries'

export default new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      user
    }
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      signup,
      signin
    }
  })
})
