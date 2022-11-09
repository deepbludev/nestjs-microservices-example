import { Test, TestingModule } from '@nestjs/testing'

import { StatusController } from './status.controller'

describe('StatusController', () => {
  let app: TestingModule
  let ctrl: StatusController

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [StatusController],
    }).compile()

    ctrl = app.get(StatusController)
  })

  describe('GET /status', () => {
    it('returns status OK', () => {
      expect(ctrl.status()).toEqual({
        statusCode: 200,
        message: '[API] All systems operational',
      })
    })
  })
})
