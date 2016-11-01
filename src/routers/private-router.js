import Router from 'koa-router'
import * as shot from '../controllers/shot'
import * as user from '../controllers/user'
import * as media from '../controllers/media'

const router = new Router()

router.get('/shots', shot.getShots)
router.post('/shot', shot.addShot)

router.put('/shot/:id', shot.PutShotById)
router.put('/media/upload_image', media.uploadImage)

export default router
