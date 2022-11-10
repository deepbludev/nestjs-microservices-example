import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices'

import { RabbitMQ } from './rabbitmq.constants'

@Injectable()
export class RmqService {
  constructor(private readonly configService: ConfigService) {}

  connect(queue: string, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>(RabbitMQ.URI)],
        queue: this.configService.get<string>(RabbitMQ.QUEUE(queue)),
        noAck,
        persistent: true,
      },
    }
  }

  ack(context: RmqContext) {
    const channel = context.getChannelRef()
    const originalMessage = context.getMessage()
    channel.ack(originalMessage)
  }
}
