import { Module } from '@nestjs/common'
import { AmqpModule, Exchange } from '@obeya/shared/infra/comms'

import { AppRpcController } from './app.rpc.controller'
import { IamConfigModule } from './config/config.module'

@Module({
  imports: [
    IamConfigModule,
    IamMicroserviceModule,
    AmqpModule.forRoot({ exchanges: [Exchange.IAM] }),
  ],
  providers: [AppRpcController],
})
export class IamMicroserviceModule {}
