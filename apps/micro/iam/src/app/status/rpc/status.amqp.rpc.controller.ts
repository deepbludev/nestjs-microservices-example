import { RPC } from '@obeya/shared/infra/comms'

import { iamAmqpRpc } from '../../utils/iam.amqp.rpc.decorator'

export class StatusAmqpRpcController {
  @iamAmqpRpc(RPC.iam.status.query)
  async status() {
    return {
      message: '[IAM] All systems operational',
    }
  }
}
