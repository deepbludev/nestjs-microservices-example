import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'

import { IamStatusGetController } from './iam.status.get.controller'

describe('IamController', () => {
  const ctrl = new IamStatusGetController(new AmqpConnection({ uri: '' }))

  describe('GET /status', () => {
    it('returns status 200 OK if IAM microservice is up', async () => {
      const message = '[IAM] All systems operational'
      ctrl.amqp.request = jest.fn().mockResolvedValue({ message })

      const response = await ctrl.status()

      expect(response).toEqual({ message })
    })
  })
})
