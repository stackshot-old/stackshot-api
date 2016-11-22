import path from 'path'
import fs from 'fs'
import pify from 'pify'
import bcrypt from 'bcrypt'
import joi from 'joi'

export function basePath(...args) {
  return path.join(__dirname, '../../', ...args)
}

export function appPath(...args) {
  return path.join(__dirname, '../../lib', ...args)
}

export const env = process.env.NODE_ENV || 'development'

export const publicKey = fs.readFileSync(basePath(`${env}.rsa.pub`))
export const privateKey = fs.readFileSync(basePath(`${env}.rsa`))

export const encrypt = pify(bcrypt)

export const validate = pify(joi.validate)

export const checkShot = (shot, userId) => {
  if (!shot) {
    return
  }
  shot._doc.liked = shot.likedUser.indexOf(userId) > -1
  return shot
}

export const checkShots = (shots, userId) => shots.map(shot => checkShot(shot, userId))

export const bodyNotEmpty = async (ctx, next) => {
  let body = ctx.request.body
  Object.keys(body).forEach(key => body[key] === undefined || body[key] === null || body[key] === '' && delete body[key]) // eslint-disable-line no-mixed-operators
  ctx.request.bodyNotEmpty = body
  await next()
}
