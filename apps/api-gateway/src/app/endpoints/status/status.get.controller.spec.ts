import { Test, TestingModule } from '@nestjs/testing'

import { StatusGetController } from './status.get.controller'

describe(StatusGetController, () => {
  let app: TestingModule
  let ctrl: StatusGetController

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [StatusGetController],
    }).compile()

    ctrl = app.get(StatusGetController)
  })

  describe('GET /status', () => {
    it('returns status OK', () => {
      expect(ctrl.status()).toEqual({
        message: '[API] All systems operational',
      })
    })
  })
})
