require('dotenv').config()

export const url = 'http://localhost:7999'

export const testAccount = {
  account: process.env.API_TEST_ACCOUNT,
  password: process.env.API_TEST_PASSWORD
}
