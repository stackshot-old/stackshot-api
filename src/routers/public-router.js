import Router from 'koa-router'
import * as auth from '../controllers/auth'
import * as shot from '../controllers/shot'
import * as user from '../controllers/user'

const router = new Router()

router.post('/auth/signup', auth.signup)
router.post('/auth/signin', auth.signin)

router.get('/shots', shot.getShots)
router.get('/shots/:id', shot.getShotById)

router.get('/user/:username', user.getUserByUsername)
router.get('/user/:username/shots', shot.getShots)

export default router
