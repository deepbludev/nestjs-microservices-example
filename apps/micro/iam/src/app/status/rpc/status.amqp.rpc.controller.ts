import { amqpRpc, Exchange, RPC } from '@obeya/shared/infra/comms'

export class StatusAmqpRpcController {
  @amqpRpc(Exchange.IAM)({ routingKey: RPC.status.iam })
  async status() {
    return {
      message: '[IAM] All systems operational',
    }
  }
}
