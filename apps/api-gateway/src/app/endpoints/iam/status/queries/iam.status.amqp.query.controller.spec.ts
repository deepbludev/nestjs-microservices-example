import { amqpServiceMock } from '@obeya/shared/infra/comms'

import { IamStatusAmqpQueryController } from './iam.status.amqp.query.controller'

describe(IamStatusAmqpQueryController, () => {
  const ctrl = new IamStatusAmqpQueryController(amqpServiceMock)

  describe('GET /status', () => {
    it('returns status 200 OK if IAM microservice is up', async () => {
      const message = '[IAM] All systems operational'
      ctrl.amqp.request = jest.fn().mockResolvedValue({ message })

      const response = await ctrl.status()

      expect(response).toEqual({ message })
    })
  })
})
