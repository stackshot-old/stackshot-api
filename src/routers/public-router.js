import Router from 'koa-router'
import * as auth from '../controllers/auth'
import * as shot from '../controllers/shot'
import * as user from '../controllers/user'
import * as graphql from '../controllers/graphql'

const router = new Router()

router.post('/auth/signup', auth.signup)
router.post('/auth/signin', auth.signin)

router.get('/shots', shot.getShots)
router.get('/shots/:id', shot.getShotById)

router.get('/user/:username', user.getUserByUsername)
router.get('/user/:username/shots', shot.getShots)

router.get('/graphql', graphql.get)
router.post('/graphql', graphql.post)

export default router
