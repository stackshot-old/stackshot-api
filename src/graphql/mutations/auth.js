import {
  GraphQLID as ID,
  GraphQLList as List,
  GraphQLNonNull as NonNull,
  GraphQLString as StringType,
  GraphQLObjectType as ObjectType
}from 'graphql'
import joi from 'joi'
import md5 from 'md5'
import jwt from 'koa-jwt'
import uuid from 'node-uuid'
import {UserType} from '../types'
import {User} from '../../models'
import {
  encrypt,
  validate,
  privateKey
} from '../../common/helpers'

export const signin = {
  type: new ObjectType ({
    name: "SignIn",
    fields: {
      user: {type: UserType},
      token: {type: StringType},
    },
  }),
  args: {
    account: {
      type: new NonNull(StringType)
    },
    password: {
      type: new NonNull(StringType)
    }
  },
  async resolve(root, {account, password}){
    let userData = {
      account,
      password
    }
    userData = await validate(userData, joi.object().keys({
      account: joi.string().min(2).max(20).required(),
      password: joi.string().min(6).max(20).required()
    }))

    const user = await User.findOne({
      $or: [
        {username: account},
        {email: account}
      ]
    })
      .select('username avatar createdAt updatedAt password')
      .exec()
    if(!user) {
      return {errors: "User not found"}
    }
    const isPasswordCorrect = await encrypt.compare(userData.password, user.password)
    user.password = undefined
    if(!isPasswordCorrect) {
      return {errors: 'Password mismatches'}
    }
    const token = jwt.sign({sub: user.id}, privateKey, {algorithm: 'RS256'})
    return {
      user: user,
      token
    }
  }
}

export const signup= {
  type: new ObjectType ({
    name: "SignUp",
    fields: {
      user: {type: UserType},
      token: {type: StringType},
    }
  }),
  args: {
    username: {
      type: new NonNull(StringType)
    },
    email: {
      type: new NonNull(StringType)
    },
    password: {
      type: new NonNull(StringType)
    }
  },
  async resolve(root, {username, email, password}){
    let userData = {
      username,
      email,
      password
    }
    userData = await validate(userData, joi.object().keys({
      username: joi.string().min(2).max(20).required(),
      email: joi.string().email().required(),
      password: joi.string().min(6).max(20).required()
    }))

    userData.avatar = `https://cdn.v2ex.co/gravatar/${md5(userData.email)}`
    userData.password = await encrypt.hash(userData.password, 10)
    userData.apiKey = uuid.v4()

    const user = new User(userData)
    await user.save()
    const token = jwt.sign({sub: user.id}, privateKey, {
      algorithm: 'RS256',
      expiresIn: '180d' // half a year
    })
    return {
      token,
      user: user.getPublic()
    }
  }
}
