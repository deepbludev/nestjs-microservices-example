import { Context } from '@obeya/shared/domain'
import { amqpRpc, RPC } from '@obeya/shared/infra/comms'

export class StatusAmqpRpcController {
  @amqpRpc(Context.IAM)({ routingKey: RPC.status.iam })
  async status() {
    return {
      message: '[IAM] All systems operational',
    }
  }
}
