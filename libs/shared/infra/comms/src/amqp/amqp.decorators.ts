import { RabbitRPC } from '@golevelup/nestjs-rabbitmq'
import { Constructor, ICommand, IQuery } from '@obeya/shared/core'
import { Context } from '@obeya/shared/domain'

export const amqpRpc =
  (exchange: Context) => (opts: { routingKey: string; queue?: string }) =>
    RabbitRPC({
      exchange,
      routingKey: opts.routingKey,
      queue: opts.queue ?? opts.routingKey + '-queue',
    })

export const amqpHandler = (
  exchange: Context,
  rpc: Constructor<ICommand | IQuery> & { canonical: string },
  queue?: string
) => amqpRpc(exchange)({ routingKey: rpc.canonical, queue })
