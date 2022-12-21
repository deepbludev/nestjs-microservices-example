import { Module } from '@nestjs/common'
import { Context } from '@obeya/shared/domain'
import { AmqpModule, CqrsModule } from '@obeya/shared/infra/comms'
import { MongoDbModule } from '@obeya/shared/infra/persistence'

import { IamConfigModule } from './config/config.module'
import { userCommandHandlers } from './modules/users/commands/users.command-handlers'
import { userQueryHandlers } from './modules/users/queries/users.query-handlers'
import { userEventSubscribers } from './modules/users/subscribers/users.event-subscribers'
import { UsersModule } from './modules/users/users.module'
import { workspaceCommandHandlers } from './modules/workspaces/command/workspaces.command-handlers'
import { workspacesQueryHandlers } from './modules/workspaces/queries/workspaces.query-handlers'
import { workspacesEventSubscribers } from './modules/workspaces/subscribers/workspaces.event-subscribers'
import { WorkspacesModule } from './modules/workspaces/workspaces.module'
import { StatusAmqpRpcController } from './status/rpc/status.amqp.rpc.controller'

@Module({
  imports: [
    IamConfigModule,
    IamMicroserviceModule,
    AmqpModule.forRoot({ exchanges: [Context.IAM] }),
    CqrsModule.forRoot({
      imports: [UsersModule, WorkspacesModule],
      commandHandlers: [...userCommandHandlers, ...workspaceCommandHandlers],
      queryHandlers: [...userQueryHandlers, ...workspacesQueryHandlers],
      eventSubscribers: [
        ...userEventSubscribers,
        ...workspacesEventSubscribers,
      ],
    }),
    MongoDbModule.forRoot({ microservice: Context.IAM }),
    UsersModule,
    WorkspacesModule,
  ],
  providers: [StatusAmqpRpcController],
})
export class IamMicroserviceModule {}
