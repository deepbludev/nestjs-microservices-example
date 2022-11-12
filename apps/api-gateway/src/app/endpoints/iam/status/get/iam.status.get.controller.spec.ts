import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'

import { IamStatusGetController } from './iam.status.get.controller'

describe('IamController', () => {
  const ctrl = new IamStatusGetController(new AmqpConnection({ uri: '' }))

  describe('GET /status', () => {
    it('returns status 200 OK if IAM microservice is up', async () => {
      ctrl.amqp.request = jest.fn().mockResolvedValue({
        message: '[IAM] All systems operational',
      })

      const response = await ctrl.status()

      expect(response).toEqual({
        statusCode: 200,
        message: '[IAM] All systems operational',
      })
    })

    it('returns status 500 Error if IAM microservice is down', async () => {
      ctrl.amqp.request = jest.fn().mockResolvedValue(null)
      const response = await ctrl.status()

      expect(response).toEqual({
        statusCode: 500,
        message: '[IAM] Systems down',
      })
    })
  })
})
