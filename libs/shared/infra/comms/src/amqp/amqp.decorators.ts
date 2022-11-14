import { Constructor, ICommand, IQuery } from '@deepblu/ddd'
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq'

import { Exchange } from '../comms.constants'

export const amqpRpc =
  (exchange: Exchange) => (opts: { routingKey: string; queue?: string }) =>
    RabbitRPC({
      exchange,
      routingKey: opts.routingKey,
      queue: opts.queue ?? opts.routingKey + '-queue',
    })

export const amqpHandler = (
  exchange: Exchange,
  rpc: Constructor<ICommand | IQuery> & { canonical: string },
  queue?: string
) => amqpRpc(exchange)({ routingKey: rpc.canonical, queue })
