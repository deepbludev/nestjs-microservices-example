import { Module } from '@nestjs/common'
import { MongoDbModule } from '@obeya/shared/infra'
import { AmqpModule, Microservice } from '@obeya/shared/infra/comms'

import { ApiGatewayConfigModule } from './config/config.module'
import { IamModule } from './endpoints/iam/iam.module'
import { StatusModule } from './endpoints/status/status.module'

@Module({
  imports: [
    ApiGatewayConfigModule,
    AmqpModule.forRoot({ exchanges: [Microservice.IAM] }),
    MongoDbModule.forRoot({ microservice: Microservice.API_GATEWAY }),
    IamModule,
    StatusModule,
  ],
})
export class ApiGatewayModule {}
