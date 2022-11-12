import { Module } from '@nestjs/common'

import { ApiGatewayConfigModule } from './config/config.module'
import { IamModule } from './endpoints/iam/iam.module'
import { StatusModule } from './endpoints/status/status.module'

@Module({
  imports: [ApiGatewayConfigModule, IamModule, StatusModule],
})
export class ApiGatewayModule {}
