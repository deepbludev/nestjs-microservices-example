import { Module } from '@nestjs/common'

import { CreateWorkspaceAmqpRpcController } from './create/create.workspace.amqp.rpc.controller'

@Module({
  imports: [],
  providers: [CreateWorkspaceAmqpRpcController],
  exports: [CreateWorkspaceAmqpRpcController],
})
export class WorkspacesCommandsModule {}
