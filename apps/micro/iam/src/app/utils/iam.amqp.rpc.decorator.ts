import { amqpRpc, Context } from '@obeya/shared/infra/comms'

export const iamAmqpRpc = (routingKey: string, queue?: string) =>
  amqpRpc(Context.IAM)({ routingKey, queue })
