import { Module } from '@nestjs/common'

import { IamStatusGetController } from './get/iam.status.get.controller'

@Module({
  controllers: [IamStatusGetController],
})
export class IamStatusModule {}
