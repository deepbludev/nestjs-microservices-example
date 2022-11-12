import { Module } from '@nestjs/common'
import { AmqpModule, Exchange } from '@obeya/shared/infra/comms'

import { ApiGatewayConfigModule } from './config/config.module'
import { IamModule } from './endpoints/iam/iam.module'
import { StatusModule } from './endpoints/status/status.module'

@Module({
  imports: [
    ApiGatewayConfigModule,
    AmqpModule.forRoot({ exchanges: [Exchange.IAM] }),
    IamModule,
    StatusModule,
  ],
})
export class ApiGatewayModule {}
