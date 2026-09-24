
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { StarWarsDatabankSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = StarWarsDatabankSDK.test()
    equal(testsdk instanceof StarWarsDatabankSDK, true,
      'StarWarsDatabankSDK.test() must return a client synchronously')
  })

})
