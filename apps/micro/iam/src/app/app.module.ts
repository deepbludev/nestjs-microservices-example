import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { Module } from '@nestjs/common'
import { Microservice } from '@obeya/shared/infra/comms'

import { AppRpcController } from './app.rpc.controller'
import { IamConfigModule } from './config/config.module'

@Module({
  imports: [
    IamConfigModule,
    AppModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [{ name: Microservice.IAM, type: 'topic' }],
      uri: 'amqp://guest:guest@rmq-broker:5672',
    }),
  ],
  providers: [AppRpcController],
})
export class AppModule {}
