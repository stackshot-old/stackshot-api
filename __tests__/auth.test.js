import request from 'superagent'
import {url, testAccount} from './config'
import {genUniqueString} from './util'

describe('auth', () => {
  it('signup', async () => {
    const data = {username: genUniqueString('test-'), password: '000000', email: `${genUniqueString('test-')}@tucao.com`}
    const {body: {token, user}} = await request.post(`${url}/auth/signup`).send(data)

    expect(token).toBeDefined()
    expect(user).toBeDefined()
  })

  it('signin', async () => {
    const {body: {token, user}} = await request.post(`${url}/auth/signin`).send(testAccount)

    expect(token).toBeDefined()
    expect(user).toBeDefined()
  })

  it('get auth user', async () => {
    const {body: {token}} = await request.post(`${url}/auth/signin`).send(testAccount)
    const {body} = await request.get(`${url}/auth/user`).set('Authorization', `Bearer ${token}`)

    expect(body).toBeDefined()
  })
})
