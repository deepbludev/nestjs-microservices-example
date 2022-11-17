import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { DynamicModule, Global, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Context } from '@obeya/shared/domain'

import { amqp } from './amqp.constants'
import { AmqpService } from './amqp.service'

interface AmqpModuleOptions {
  exchanges: Context[]
}

@Global()
@Module({
  providers: [AmqpService],
  exports: [AmqpService],
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
