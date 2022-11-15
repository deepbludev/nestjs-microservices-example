import { amqpRpc, Microservice, RPC } from '@obeya/shared/infra/comms'

export class StatusAmqpRpcController {
  @amqpRpc(Microservice.IAM)({ routingKey: RPC.status.iam })
  async status() {
    return {
      message: '[IAM] All systems operational',
    }
  }
}
