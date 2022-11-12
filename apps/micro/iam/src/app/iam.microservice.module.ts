import { Module } from '@nestjs/common'
import { AmqpModule, Exchange } from '@obeya/shared/infra/comms'

import { IamConfigModule } from './config/config.module'
import { StatusAmqpRpcController } from './rpc/status/status.amqp.rpc.controller'

@Module({
  imports: [
    IamConfigModule,
    IamMicroserviceModule,
    AmqpModule.forRoot({ exchanges: [Exchange.IAM] }),
  ],
  providers: [StatusAmqpRpcController],
})
export class IamMicroserviceModule {}
