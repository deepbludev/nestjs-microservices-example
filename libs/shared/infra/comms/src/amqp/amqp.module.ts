import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { DynamicModule, Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { Exchange } from '../comms.constants'
import { amqp } from './amqp.constants'

interface AmqpModuleOptions {
  exchanges: Exchange[]
}

@Global()
@Module({
  providers: [],
})
export class AmqpModule {
  static forRoot({ exchanges }: AmqpModuleOptions): DynamicModule {
    return {
      module: AmqpModule,
      global: true,
      imports: [
        RabbitMQModule.forRootAsync(RabbitMQModule, {
          inject: [ConfigService],
          useFactory: (config: ConfigService) => ({
            exchanges: exchanges.map(exchange => ({
              name: exchange,
              type: 'topic',
            })),
            uri: config.get(amqp.uri),
          }),
        }),
      ],
      exports: [RabbitMQModule],
    }
  }
}
