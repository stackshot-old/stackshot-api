import joi from 'joi'
import jwt from 'koa-jwt'
import uuid from 'node-uuid'
import _ from 'lodash'
import md5 from 'md5'
import User from '../models/user'
import {
  encrypt,
  validate,
  privateKey
} from '../common/helpers'

export async function signup(ctx) {
  let userData = {
    username: ctx.request.body.username,
    email: ctx.request.body.email,
    password: ctx.request.body.password
  }

  try {
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

    ctx.body = {
      token,
      user: user.getPublic()
    }
  } catch (err) {
    ctx.throw(403, err)
  }
}

export async function signin(ctx) {
  let userData = {
    // username or email
    account: ctx.request.body.account,
    password: ctx.request.body.password
  }

  try {
    userData = await validate(userData, joi.object().keys({
      account: joi.string().min(2).max(20).required(),
      password: joi.string().min(6).max(20).required()
    }))
  } catch (err) {
    return ctx.throw(403, err)
  }

  const user = await User.findOne({
    $or: [
      {username: userData.account},
      {email: userData.account}
    ]
  })
    .select('username avatar createdAt updatedAt password')
    .exec()

  if (!user) {
    return ctx.throw(404, 'user not found')
  }

  const isPasswordCorrect = await encrypt.compare(userData.password, user.password)
  user.password = undefined

  if (!isPasswordCorrect) {
    ctx.throw(403, 'Passoword mismatches')
  }

  const token = jwt.sign({sub: user.id}, privateKey, {algorithm: 'RS256'})
  ctx.body = {
    token,
    user
  }
}

export async function getAuthUser(ctx) {
  const sub = ctx.state.user && ctx.state.user.sub
  if(!sub){
    ctx.throw(401)
  }

  const user = await User
    .findById(sub)
    .exec()

  ctx.body = user
}
