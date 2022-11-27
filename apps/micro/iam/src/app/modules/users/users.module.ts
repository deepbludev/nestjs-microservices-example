import { Global, Module } from '@nestjs/common'

import { UsersCommandsModule } from './commands/users.commands.module'
import { UsersInfraModule } from './infra/users.infra.module'
import { UsersQueriesModule } from './queries/users.queries.module'

@Global()
@Module({
  imports: [UsersInfraModule, UsersCommandsModule, UsersQueriesModule],
  providers: [],
  exports: [UsersInfraModule],
})
export class UsersModule {}
