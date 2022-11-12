import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'

import { IamStatusGetAmqpController } from './iam.status.get.amqp.controller'

describe(IamStatusGetAmqpController, () => {
  const ctrl = new IamStatusGetAmqpController(new AmqpConnection({ uri: '' }))

  describe('GET /status', () => {
    it('returns status 200 OK if IAM microservice is up', async () => {
      const message = '[IAM] All systems operational'
      ctrl.amqp.request = jest.fn().mockResolvedValue({ message })

      const response = await ctrl.status()

      expect(response).toEqual({ message })
    })
  })
})
