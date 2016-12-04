import request from 'superagent'
import {url} from './config'

describe('get shots', () => {
  it('get custom limit shots', async () => {
    const shots = await request.get(`${url}/shots`).query({limit: 5})

    expect(shots.body.length).toEqual(5)
  })
  
  //TODO: add shot
})
