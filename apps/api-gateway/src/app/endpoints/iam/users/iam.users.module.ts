import { Module } from '@nestjs/common'

import { IamUsersCommandController } from './commands/iam.users.command.controller'

@Module({
  controllers: [IamUsersCommandController],
})
export class IamUsersModule {}
