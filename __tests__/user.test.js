import request from 'superagent'
import {url, testAccount} from './config'

const checkProfiles = async (source, target) => {
  return Object.keys(target).every(e => target[e] === source[e])
}

describe('update profiles', () => {
  it('update profiles', async () => {
    const {body: { token }} = await request.post(`${url}/auth/signin`).send(testAccount)

    const data = {gender: 'male', birthday: new Date(Date.parse("1995,08,24")).toISOString(), website: 'www.gensokyo.moe', signature: '可爱的男孩子'}
    const { body: { user} } = await request.put(`${url}/user/profiles`).set('Authorization', `Bearer ${token}`).send(data)

    expect(checkProfiles(user, data)).toBeTruthy()
  })
})
