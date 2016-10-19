import test from 'ava';
import fetch from 'axios';

test('register', async t => {
  try {
    const result = await fetch.post('http://localhost:7999/auth/signup', {
      username: 'egoist',
      email: '0x142857@gmail.com',
      password: '123456'
    })
    t.is(result.status, 200);
    console.log(result.data)
  } catch (err) {
    console.log(err.stack)
  }
})
