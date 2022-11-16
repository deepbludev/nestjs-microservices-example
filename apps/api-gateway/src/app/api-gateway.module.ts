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
    MongoDbModule.forRoot({
      uri: `mongodb://localhost:27017`,
    }),
    IamModule,
    StatusModule,
  ],
})
export class ApiGatewayModule {}
