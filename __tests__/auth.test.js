import request from 'superagent'
import {url, testAccount, testAccountTest} from './config'

const genUniqueString = (salt) => `${salt}${Math.random().toString(36).substr(2, 10)}`

describe('auth', () => {
  it('signup', async () => {
    const data = {username: genUniqueString('test-'), password: '123456', email: `${genUniqueString('test-')}@tucao.com`}
    const {body: {token, user}} = await request.post(`${url}/auth/signup`).send(data)

    expect(token).toBeDefined()
    expect(user).toBeDefined()
  })

  it('signin', async () => {
    const {body: {token, user}} = await request.post(`${url}/auth/signin`).send(testAccount)

    expect(token).toBeDefined()
    expect(user).toBeDefined()
  })
})
