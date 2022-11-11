import { Module } from '@nestjs/common'
import { AmqpModule, Exchange } from '@obeya/shared/infra/comms'

import { IamHttpController } from './iam.http.controller'

@Module({
  imports: [IamModule, AmqpModule.forRoot({ exchanges: [Exchange.IAM] })],
  controllers: [IamHttpController],
})
export class IamModule {}
