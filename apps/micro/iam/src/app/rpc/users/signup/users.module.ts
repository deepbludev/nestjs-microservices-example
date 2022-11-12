import { Module } from '@nestjs/common'

import { SignupUserAmqpRpcController } from './signup.user.amqp.rpc.controller'

@Module({
  providers: [SignupUserAmqpRpcController],
})
export class UsersModule {}
