import request from 'superagent'
import {url, testAccount} from './config'
import {genUniqueString, genRandomOfDatas} from './util'
import mock from './__mocks__/233'

const genData = () => ({username: genUniqueString('test-'), password: '000000', email: `${genUniqueString('test-')}@tucao.com`})

describe('comment', () => {
  it('should send comment and reply then receive message', async () => {

    try {
      //get test user
      const [user1, user2] = await Promise.all([
        request.post(`${url}/auth/signup`).send(genData()),
        request.post(`${url}/auth/signup`).send(genData())
      ])
      expect(user1.body).toBeDefined()
      expect(user2.body).toBeDefined()

      // get test shot
      const {body: [ shot ]} = await request.get(`${url}/shots`).query({limit: 1})

      // send dummy comment
      const dummyComment = {
        content: genRandomOfDatas(mock),
        shot: shot._id
      }

      let comment1 = await request.post(`${url}/comment`).set('Authorization', `Bearer ${user1.body.token}`).send(dummyComment)
      expect(comment1.body).toBeDefined()

      //send dummy reply
      const dummyReply = {
        content: genRandomOfDatas(mock),
        replyTo: user1.body.user._id,
        shot: shot._id
      }

      let comment2 = await request.post(`${url}/comment`).set('Authorization', `Bearer ${user2.body.token}`).send(dummyReply)
      expect(comment2.body).toBeDefined()

      // get message
      let message1 = await request.get(`${url}/auth/messages`).set('Authorization', `Bearer ${user1.body.token}`)
      expect(message1.body.length).toBeGreaterThan(0)

    } catch (e) {
      console.log(e)
    }
  })
})
