import { Module } from '@nestjs/common'
import { Context } from '@obeya/shared/domain'
import { AmqpModule } from '@obeya/shared/infra/comms'
import { MongoDbModule } from '@obeya/shared/infra/persistence'

import { ApiGatewayConfigModule } from './config/config.module'
import { IamModule } from './endpoints/iam/iam.module'
import { StatusModule } from './endpoints/status/status.module'

@Module({
  imports: [
    ApiGatewayConfigModule,
    AmqpModule.forRoot({ exchanges: [Context.IAM] }),
    MongoDbModule.forRoot({ microservice: Context.API_GATEWAY }),
    IamModule,
    StatusModule,
  ],
})
export class ApiGatewayModule {}
