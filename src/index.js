import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import jwt from 'koa-jwt'
import convert from 'koa-convert'
import cors from 'kcors'
import {publicKey} from './common/helpers'
import handleSocket from './handle-socket'

import './env'
import './db'

import publicRouter from './routers/public-router'
import privateRouter from './routers/private-router'

const app = new Koa()

app.use(convert(cors()))
app.use(bodyparser({
  formLimit: '1024kb'
}))
app.use(publicRouter.routes())
app.use(publicRouter.allowedMethods())

app.use(async (ctx, next) => {
  try {
    await next() // Attempt to go through the JWT Validator
  } catch (e) {
    if (e.status == 401) {
      // Prepare response to user.
      ctx.status = e.status
      ctx.body = {error: 'You don\'t have a signed token dude :('}
    } else {
      throw e // Pass the error to the next handler since it wasn't a JWT error.
    }
  }
})

app.use(convert(jwt({
  secret: publicKey,
  algorithm: 'RS256',
  passthrough: true
})))

app.use(privateRouter.routes())
app.use(privateRouter.allowedMethods())

const server = require('http').Server(app.callback())
handleSocket(server)

const port = process.env.PORT
server.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
