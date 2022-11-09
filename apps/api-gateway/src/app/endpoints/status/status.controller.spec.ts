import { Test, TestingModule } from '@nestjs/testing'

import { StatusController } from './status.controller'

describe('StatusController', () => {
  let app: TestingModule
  let statusCtrl: StatusController

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [StatusController],
    }).compile()

    statusCtrl = app.get(StatusController)
  })

  describe('GET /status', () => {
    it('should return status OK', () => {
      expect(statusCtrl.status()).toEqual({
        statusCode: 200,
        message: '[api-gateway] All systems operational.',
      })
    })
  })
})
