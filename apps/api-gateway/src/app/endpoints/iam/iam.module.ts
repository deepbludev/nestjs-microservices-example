import { Module } from '@nestjs/common'

import { IamStatusModule } from './status/iam.status.module'
import { IamUsersModule } from './users/iam.users.module'
import { IamWorkspacesModule } from './workspaces/iam.workspaces.module'

@Module({
  imports: [IamStatusModule, IamUsersModule, IamWorkspacesModule],
})
export class IamModule {}
