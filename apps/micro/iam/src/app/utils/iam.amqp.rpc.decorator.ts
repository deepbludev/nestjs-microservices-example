import { amqpRpc, Microservice } from '@obeya/shared/infra/comms'

export const iamAmqpRpc = (routingKey: string, queue?: string) =>
  amqpRpc(Microservice.IAM)({ routingKey, queue })
