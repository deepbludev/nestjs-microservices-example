import { Module } from '@nestjs/common'
import { WorkspacesFactory } from '@obeya/contexts/iam/domain'

import { WorkspacesPersistenceModule } from './persistence/workspaces.persistence.module'

@Module({
  imports: [WorkspacesPersistenceModule],
  providers: [WorkspacesFactory],
  exports: [WorkspacesPersistenceModule, WorkspacesFactory],
})
export class WorkspacesInfraModule {}
