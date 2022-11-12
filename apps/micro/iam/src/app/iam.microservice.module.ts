import { Module } from '@nestjs/common'
import { AmqpModule, Exchange } from '@obeya/shared/infra/comms'

import { IamConfigModule } from './config/config.module'
import { StatusAmqpRpcController } from './rpc/status/status.amqp.rpc.controller'
import { UsersModule } from './rpc/users/signup/users.module'

@Module({
  imports: [
    IamConfigModule,
    IamMicroserviceModule,
    AmqpModule.forRoot({ exchanges: [Exchange.IAM] }),
    UsersModule,
  ],
  providers: [StatusAmqpRpcController],
})
export class IamMicroserviceModule {}
