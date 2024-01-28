/* eslint-env detox/detox */

import {describe, beforeAll, it} from '@jest/globals'
import {expect} from 'detox'
import {openApp, login, createServer} from '../util'

describe('Login', () => {
  let service: string
  beforeAll(async () => {
    service = await createServer('?users')
    await openApp({permissions: {notifications: 'YES'}})
  })

  it('As Alice, I can login', async () => {
    await element(by.id('e2eOpenLoggedOutView')).tap()

    await expect(element(by.id('signInButton'))).toBeVisible()
    await login(service, 'alice', 'hunter2', {
      takeScreenshots: true,
    })
    await device.takeScreenshot('5- opened home screen')
  })
})
