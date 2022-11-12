import { RabbitRPC } from '@golevelup/nestjs-rabbitmq'

import { Exchange } from '../comms.constants'

export const amqpRpc =
  (exchange: Exchange) => (opts: { routingKey: string; queue?: string }) =>
    RabbitRPC({
      exchange,
      routingKey: opts.routingKey,
      queue: opts.queue ?? opts.routingKey + '-queue',
    })
