import { Module } from '@nestjs/common'
import { AmqpModule, CqrsModule, Exchange } from '@obeya/shared/infra/comms'

import { IamConfigModule } from './config/config.module'
import { userCommandHandlers } from './modules/users/commands/users.command-handlers'
import { UsersModule } from './modules/users/users.module'
import { WorkspacesModule } from './modules/workspaces/workspaces.module'
import { StatusAmqpRpcController } from './status/rpc/status.amqp.rpc.controller'

@Module({
  imports: [
    IamConfigModule,
    IamMicroserviceModule,
    AmqpModule.forRoot({ exchanges: [Exchange.IAM] }),
    CqrsModule.forRoot({
      commandHandlers: [...userCommandHandlers],
      queryHandlers: [],
      eventSubscribers: [],
    }),
    UsersModule,
    WorkspacesModule,
  ],
  providers: [StatusAmqpRpcController],
})
export class IamMicroserviceModule {}
