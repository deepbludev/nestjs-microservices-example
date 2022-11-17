import { Global, Module } from '@nestjs/common'

import { SignupUserAmqpRpcController } from './application/commands/signup/signup.user.amqp.rpc.controller'
import { UsersInfraModule } from './infra/users.infra.module'

@Global()
@Module({
  imports: [UsersInfraModule],
  providers: [SignupUserAmqpRpcController],
  exports: [UsersInfraModule],
})
export class UsersModule {}
