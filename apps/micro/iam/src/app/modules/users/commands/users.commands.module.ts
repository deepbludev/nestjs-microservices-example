import { Module } from '@nestjs/common'

import { SignupUserAmqpRpcController } from './signup/signup.user.amqp.rpc.controller'

@Module({
  imports: [],
  providers: [SignupUserAmqpRpcController],
  exports: [SignupUserAmqpRpcController],
})
export class UsersCommandsModule {}
