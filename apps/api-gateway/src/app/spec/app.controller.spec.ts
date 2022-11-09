import { Test, TestingModule } from '@nestjs/testing'

import { AppController } from '../app.controller'

describe('AppController', () => {
  let app: TestingModule
  let appController: AppController

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
    }).compile()

    appController = app.get(AppController)
  })

  describe('GET /status', () => {
    it('should return status OK', () => {
      expect(appController.status()).toEqual({
        statusCode: 200,
        message: '[api-gateway] All systems operational.',
      })
    })
  })
})
