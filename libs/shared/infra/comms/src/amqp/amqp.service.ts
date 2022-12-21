/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AmqpConnection,
  ConnectionInitOptions,
  MessageHandlerErrorBehavior,
  RabbitMQChannels,
  RabbitMQExchangeConfig,
  RabbitMQHandlers,
} from '@golevelup/nestjs-rabbitmq'
import { Injectable, LoggerService } from '@nestjs/common'
import { AmqpConnectionManagerOptions } from 'amqp-connection-manager'
import { Channel, Connection, Options } from 'amqplib'

export type AmqpRequestOptions = {
  exchange: string
  routingKey: string
  correlationId?: string
  timeout?: number
  payload?: any
  headers?: any
  expiration?: string | number
}

export interface AmqpConfig {
  name?: string
  uri: string | string[]
  prefetchCount?: number
  exchanges?: RabbitMQExchangeConfig[]
  defaultRpcTimeout?: number
  defaultExchangeType?: string
  defaultRpcErrorBehavior?: MessageHandlerErrorBehavior
  defaultSubscribeErrorBehavior?: MessageHandlerErrorBehavior
  connectionInitOptions?: ConnectionInitOptions
  connectionManagerOptions?: AmqpConnectionManagerOptions
  registerHandlers?: boolean
  enableDirectReplyTo?: boolean
  enableControllerDiscovery?: boolean
  channels?: RabbitMQChannels
  handlers?: RabbitMQHandlers
  logger?: LoggerService
  deserializer?: (message: Buffer) => any
  serializer?: (value: any) => Buffer
}

@Injectable()
export class AmqpService {
  constructor(private readonly amqp: AmqpConnection) {}

  async request<T>(options: AmqpRequestOptions): Promise<T> {
    return this.amqp.request<T>(options)
  }

  publish<T = any>(
    exchange: string,
    routingKey: string,
    message: T,
    options?: Options.Publish
  ): void {
    this.amqp.publish<T>(exchange, routingKey, message, options)
  }

  get channel(): Channel {
    return this.amqp.channel
  }

  get connection(): Connection {
    return this.amqp.connection
  }

  get configuration(): Required<AmqpConfig> {
    return this.amqp.configuration
  }

  get channels(): Record<string, Channel> {
    return this.amqp.channels
  }

  get connected(): boolean {
    return this.amqp.connected
  }

  async init(): Promise<void> {
    return this.amqp.init()
  }
}
