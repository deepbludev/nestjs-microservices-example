import { Result } from '@deepblu/ddd'
import { Body, Controller, Post } from '@nestjs/common'
import { SignupUserDTO } from '@obeya/contexts/iam/domain'
import { AmqpService, Exchange, RPC } from '@obeya/shared/infra/comms'

@Controller('/iam/users')
export class IamUsersPostController {
  constructor(readonly amqp: AmqpService) {}

  @Post('/signup')
  async signup(@Body() dto: SignupUserDTO) {
    return this.amqp.request<Result>({
      exchange: Exchange.IAM,
      routingKey: RPC.iam.users.signup.command,
      payload: dto,
      timeout: RPC.timeout,
    })
  }
}
