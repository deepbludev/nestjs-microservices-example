import { Module } from '@nestjs/common'
import { IamController } from './iam.controller'

@Module({
  imports: [],
  controllers: [IamController],
})
export class IamModule {}
