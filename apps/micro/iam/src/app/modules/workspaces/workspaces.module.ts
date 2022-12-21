import { Global, Module } from '@nestjs/common'

import { WorkspacesCommandsModule } from './command/workspaces.commands.module'
import { WorkspacesInfraModule } from './infra/workspaces.infra.module'
import { WorkspacesQueriesModule } from './queries/workspaces.queries.module'

@Global()
@Module({
  imports: [
    WorkspacesInfraModule,
    WorkspacesCommandsModule,
    WorkspacesQueriesModule,
  ],
  providers: [],
  exports: [WorkspacesInfraModule],
})
export class WorkspacesModule {}
