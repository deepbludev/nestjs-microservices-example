import { StatusAmqpRpcController } from './status.amqp.rpc.controller'
describe(StatusAmqpRpcController, () => {
  describe('#status', () => {
    it('returns status 200 OK if IAM microservice is up', async () => {
      const ctrl = new StatusAmqpRpcController()

      expect(await ctrl.status()).toEqual({
        message: '[IAM] All systems operational',
      })
    })
  })
})
