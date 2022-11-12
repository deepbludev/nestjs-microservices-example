import { Module } from '@nestjs/common'

import { IamStatusModule } from './status/iam.status.module'

@Module({
  imports: [IamStatusModule],
})
export class IamModule {}
