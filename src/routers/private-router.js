import Router from 'koa-router'
import * as shot from '../controllers/shot'
import * as media from '../controllers/media'
import * as comment from '../controllers/comment'
import * as user from '../controllers/user'
import * as auth from '../controllers/auth'
import {bodyNotEmpty} from '../common/helpers'

const router = new Router()

router.get('/replys', comment.getReplys)
router.get('/shots', shot.getShots)
router.get('/auth/user', auth.getAuthUser)

router.post('/shot', shot.addShot)
router.post('/comment', comment.addComment)

router.put('/shot/:id/like', shot.likeShotById)
router.put('/media/upload_image', media.uploadImage)
router.put('/user/profiles', bodyNotEmpty, user.updateUserProfiles)

export default router
