import { Constructor, ICommand, IQuery } from '@deepblu/ddd'
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq'

import { Microservice } from '../comms.constants'

export const amqpRpc =
  (exchange: Microservice) => (opts: { routingKey: string; queue?: string }) =>
    RabbitRPC({
      exchange,
      routingKey: opts.routingKey,
      queue: opts.queue ?? opts.routingKey + '-queue',
    })

export const amqpHandler = (
  exchange: Microservice,
  rpc: Constructor<ICommand | IQuery> & { canonical: string },
  queue?: string
) => amqpRpc(exchange)({ routingKey: rpc.canonical, queue })
