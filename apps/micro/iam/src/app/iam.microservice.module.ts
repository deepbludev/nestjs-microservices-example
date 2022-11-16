import { Module } from '@nestjs/common'
import { UsersInfraModule } from '@obeya/contexts/iam/infra'
import { MongoDbModule } from '@obeya/shared/infra'
import { AmqpModule, CqrsModule, Microservice } from '@obeya/shared/infra/comms'

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
    AmqpModule.forRoot({ exchanges: [Microservice.IAM] }),
    CqrsModule.forRoot({
      imports: [UsersInfraModule],
      commandHandlers: [...userCommandHandlers],
      queryHandlers: [],
      eventSubscribers: [...userEventSubscribers],
    }),
    MongoDbModule.forRoot({ microservice: Microservice.IAM }),
    UsersModule,
    WorkspacesModule,
  ],
  providers: [StatusAmqpRpcController],
})
export class IamMicroserviceModule {}
