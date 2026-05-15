
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { OpenverseSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await OpenverseSDK.test()
    equal(null !== testsdk, true)
  })

})
