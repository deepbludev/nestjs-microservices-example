import { Body, Controller, Post } from '@nestjs/common'
import { SignupUserDTO } from '@obeya/contexts/iam/domain'
import { AmqpService, Exchange, rpc } from '@obeya/shared/infra/comms'

@Controller('/iam/users')
export class IamUsersPostController {
  constructor(readonly amqp: AmqpService) {}

  @Post('/signup')
  async signup(@Body() dto: SignupUserDTO) {
    return await this.amqp.request({
      exchange: Exchange.IAM,
      routingKey: rpc.iam.users.signup.command,
      payload: dto,
      timeout: 10000,
    })
  }
}
