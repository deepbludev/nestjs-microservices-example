import { StatusAmqpRpcController } from './status.amqp.rpc.controller'

describe(StatusAmqpRpcController, () => {
  const ctrl = new StatusAmqpRpcController()

  describe('#status', () => {
    it('returns status 200 OK if IAM microservice is up', async () => {
      expect(await ctrl.status()).toEqual({
        message: '[IAM] All systems operational',
      })
    })
  })
})
