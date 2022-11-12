import { Controller, Post } from '@nestjs/common'
import { SignupUserDTO } from '@obeya/contexts/iam/domain'
import { AmqpService, Exchange, rpc } from '@obeya/shared/infra/comms'

@Controller('/iam')
export class IamUsersPostController {
  constructor(readonly amqp: AmqpService) {}

  @Post('/users/signup')
  async signup(dto: SignupUserDTO) {
    const response = await this.amqp.request<{ message: string }>({
      exchange: Exchange.IAM,
      routingKey: rpc.iam.users.signup.command,
      payload: dto,
      timeout: 10000,
    })

    return {
      message: response.message,
    }
  }
}
