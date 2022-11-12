import { amqpRpc, Exchange } from '@obeya/shared/infra/comms'

export const iamAmqpRpc = (routingKey: string, queue?: string) =>
  amqpRpc(Exchange.IAM)({ routingKey, queue })
