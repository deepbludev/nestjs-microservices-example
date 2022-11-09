import { Test, TestingModule } from '@nestjs/testing'

import { IamController } from './iam.controller'

describe('IamController', () => {
  let app: TestingModule
  let ctrl: IamController

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [IamController],
    }).compile()

    ctrl = app.get(IamController)
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
