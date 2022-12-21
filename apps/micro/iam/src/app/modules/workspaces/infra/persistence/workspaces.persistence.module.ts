import { Module } from '@nestjs/common'
import { WorkspacesRepo } from '@obeya/contexts/iam/domain'

import { MongoDbWorkspacesRepo } from './mongodb/mongodb.workspaces.repo'

@Module({
  imports: [],
  providers: [{ provide: WorkspacesRepo, useClass: MongoDbWorkspacesRepo }],
  exports: [WorkspacesRepo],
})
export class WorkspacesPersistenceModule {}
