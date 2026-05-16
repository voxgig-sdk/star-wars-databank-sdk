
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { StarWarsDatabankSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await StarWarsDatabankSDK.test()
    equal(null !== testsdk, true)
  })

})
