import request from 'superagent'
import {url, testAccount} from './config'



describe('like', () => {
  it(' handle like and dislike', async () => {
    //sign in
    const {body: { token }} = await request.post(`${url}/auth/signin`).send(testAccount)

    // get random shot
    const {body: [ shot ]} = await request.get(`${url}/shots`).query({limit: 5})
    const {_id} = shot

    //like
    const like = await request.put(`${url}/shot/${_id}/like`).set('Authorization', `Bearer ${token}`).send({liked: true})
    expect(like.body.user.likedShot).toContainEqual(_id)
    expect(like.body.shot.likedUser).toContainEqual(like.body.user._id)
    expect(like.body.shot.liked).toBeTruthy()

    const dislike = await request.put(`${url}/shot/${_id}/like`).set('Authorization', `Bearer ${token}`).send({liked: false})
    expect(dislike.body.user.likedShot).not.toContainEqual(_id)
    expect(dislike.body.shot.likedUser).not.toContainEqual(dislike.body.user._id)
    expect(dislike.body.shot.liked).toBeFalsy()
  })
})
