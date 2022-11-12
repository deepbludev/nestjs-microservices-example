import { amqpRpc, Exchange } from '@obeya/shared/infra/comms'

export class AppRpcController {
  @amqpRpc({
    exchange: Exchange.IAM,
    routingKey: 'status',
    queue: 'iam-status-queue',
  })
  async status(msg: { request: string }) {
    console.log('RECEIVED in IAM: ', msg)
    return {
      message: '[IAM] All systems operational',
    }
  }
}
