import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'

import { IamStatusGetController } from './iam.status.get.controller'

describe('IamController', () => {
  let ctrl: IamStatusGetController
  let amqp: AmqpConnection

  beforeAll(async () => {
    amqp = new AmqpConnection({ uri: '' })
    ctrl = new IamStatusGetController(amqp)
  })

  describe('GET /status', () => {
    it('returns status OK if IAM microservice is up', async () => {
      amqp.request = jest.fn().mockResolvedValue({
        message: '[IAM] All systems operational',
      })

      const response = await ctrl.status()

      expect(response).toEqual({
        statusCode: 200,
        message: '[IAM] All systems operational',
      })
    })

    it('returns status ERROR if IAM microservice is down', async () => {
      amqp.request = jest.fn().mockResolvedValue(null)
      const response = await ctrl.status()

      expect(response).toEqual({
        statusCode: 500,
        message: '[IAM] Systems down',
      })
    })
  })
})
