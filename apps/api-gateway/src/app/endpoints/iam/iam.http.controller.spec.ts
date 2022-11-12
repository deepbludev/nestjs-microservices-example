import { Test, TestingModule } from '@nestjs/testing'

import { IamHttpController } from './iam.http.controller'

describe('IamController', () => {
  let app: TestingModule
  let ctrl: IamHttpController

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [IamHttpController],
    }).compile()

    ctrl = app.get(IamHttpController)
  })

  describe('GET /status', () => {
    it('returns status OK', () => {
      expect(ctrl.status()).toEqual({
        statusCode: 200,
        message: '[IAM] All systems operational',
      })
    })
  })
})
