import { Module } from '@nestjs/common'

import { IamWorkspacesCommandsController } from './commands/iam.workspaces.command.controller'

@Module({
  controllers: [IamWorkspacesCommandsController],
})
export class IamWorkspacesModule {}
