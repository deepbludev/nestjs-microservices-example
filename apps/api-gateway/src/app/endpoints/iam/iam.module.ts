import { Module } from '@nestjs/common'

import { IamStatusModule } from './status/iam.status.module'
import { IamUsersModule } from './users/iam.users.module'

@Module({
  imports: [IamStatusModule, IamUsersModule],
})
export class IamModule {}
