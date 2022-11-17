import { Context } from '@obeya/shared/domain'
import { amqpRpc } from '@obeya/shared/infra/comms'

export const iamAmqpRpc = (routingKey: string, queue?: string) =>
  amqpRpc(Context.IAM)({ routingKey, queue })
