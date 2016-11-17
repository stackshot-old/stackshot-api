import Router from 'koa-router'
import * as shot from '../controllers/shot'
import * as media from '../controllers/media'
import * as comment from '../controllers/comment'

const router = new Router()

router.get('/replys', comment.getReplys)
router.get('/shots', shot.getShots)
router.post('/shot', shot.addShot)
router.post('/comment', comment.addComment)

router.put('/shot/:id/like', shot.likeShotById)
router.put('/media/upload_image', media.uploadImage)

export default router
