import { Module } from '@nestjs/common'
import { RmqModule } from '@obeya/shared/infra/comms'

import { AppController } from './app.controller'
import { IamConfigModule } from './config/config.module'

@Module({
  imports: [RmqModule, IamConfigModule],
  controllers: [AppController],
})
export class AppModule {}
