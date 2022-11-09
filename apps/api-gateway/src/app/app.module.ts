import { Module } from '@nestjs/common'

import { ApiGatewayConfigModule } from './config/config.module'
import { StatusController } from './endpoints/status/status.controller'

@Module({
  imports: [ApiGatewayConfigModule],
  controllers: [StatusController],
})
export class AppModule {}
