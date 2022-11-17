import { Module } from '@nestjs/common'
import { UsersInfraModule } from '@obeya/contexts/iam/infra'
import { Context } from '@obeya/shared/domain'
import { AmqpModule, CqrsModule } from '@obeya/shared/infra/comms'
import { MongoDbModule } from '@obeya/shared/infra/persistence'

import { IamConfigModule } from './config/config.module'
import { userCommandHandlers } from './modules/users/commands/users.command-handlers'
import { userEventSubscribers } from './modules/users/subscribers/users.event-subscribers'
import { UsersModule } from './modules/users/users.module'
import { WorkspacesModule } from './modules/workspaces/workspaces.module'
import { StatusAmqpRpcController } from './status/rpc/status.amqp.rpc.controller'

@Module({
  imports: [
    IamConfigModule,
    IamMicroserviceModule,
    AmqpModule.forRoot({ exchanges: [Context.IAM] }),
    CqrsModule.forRoot({
      imports: [UsersInfraModule],
      commandHandlers: [...userCommandHandlers],
      queryHandlers: [],
      eventSubscribers: [...userEventSubscribers],
    }),
    MongoDbModule.forRoot({ microservice: Context.IAM }),
    UsersModule,
    WorkspacesModule,
  ],
  providers: [StatusAmqpRpcController],
})
export class IamMicroserviceModule {}
