import { Module } from '@nestjs/common'

import { Microservice, RmqModule } from '@lean/shared/infra/comms'

import { ApiGatewayConfigModule } from './config/config.module'
import { IamModule } from './endpoints/iam/iam.module'
import { StatusModule } from './endpoints/status/status.module'

@Module({
  imports: [
    ApiGatewayConfigModule,
    IamModule,
    StatusModule,
    RmqModule.forRoot({ queues: [Microservice.IAM] }),
  ],
})
export class AppModule {}
