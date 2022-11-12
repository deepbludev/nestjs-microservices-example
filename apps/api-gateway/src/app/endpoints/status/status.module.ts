import { Module } from '@nestjs/common'

import { StatusGetController } from './status.get.controller'

@Module({
  imports: [],
  controllers: [StatusGetController],
})
export class StatusModule {}
