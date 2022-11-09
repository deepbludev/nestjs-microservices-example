import { Module } from '@nestjs/common'

import { StatusController } from './endpoints/status/status.controller'

@Module({
  controllers: [StatusController],
})
export class AppModule {}
