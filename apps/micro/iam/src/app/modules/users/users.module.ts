import { Module } from '@nestjs/common'

import { SignupUserAmqpRpcController } from './commands/signup/signup.user.amqp.rpc.controller'

@Module({
  providers: [SignupUserAmqpRpcController],
})
export class UsersModule {}
