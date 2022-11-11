import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { Module } from '@nestjs/common'
import { Exchange } from '@obeya/shared/infra/comms'

import { IamHttpController } from './iam.http.controller'

@Module({
  imports: [
    IamModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [{ name: Exchange.IAM, type: 'topic' }],
      uri: 'amqp://guest:guest@rmq-broker:5672',
    }),
  ],
  controllers: [IamHttpController],
})
export class IamModule {}
