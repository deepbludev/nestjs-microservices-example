import { Module } from '@nestjs/common'
import { AmqpModule, Exchange } from '@obeya/shared/infra/comms'

import { IamConfigModule } from './config/config.module'
import { UsersModule } from './modules/users/users.module'
import { WorkspacesModule } from './modules/workspaces/workspaces.module'
import { StatusAmqpRpcController } from './status/rpc/status.amqp.rpc.controller'

@Module({
  imports: [
    IamConfigModule,
    IamMicroserviceModule,
    AmqpModule.forRoot({ exchanges: [Exchange.IAM] }),
    UsersModule,
    WorkspacesModule,
  ],
  providers: [StatusAmqpRpcController],
})
export class IamMicroserviceModule {}
