import { Body, Controller, Post } from '@nestjs/common'
import { SignupUser, SignupUserDTO } from '@obeya/contexts/iam/domain'
import { AmqpService, Exchange, RPC } from '@obeya/shared/infra/comms'

@Controller('/iam/users')
export class IamUsersPostController {
  constructor(readonly amqp: AmqpService) {}

  @Post('/signup')
  async signup(@Body() payload: SignupUserDTO) {
    return this.amqp.request({
      exchange: Exchange.IAM,
      routingKey: SignupUser.canonical,
      payload,
      timeout: RPC.timeout,
    })
  }
}
