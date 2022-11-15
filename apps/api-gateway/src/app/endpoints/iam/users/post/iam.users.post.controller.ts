import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import {
  SignupUser,
  SignupUserDTO,
  UserEmailAlreadyInUseError,
  UserIdAlreadyExistsError,
} from '@obeya/contexts/iam/domain'
import {
  AmqpResponse,
  AmqpService,
  Exchange,
  RPC,
} from '@obeya/shared/infra/comms'

@Controller('/iam/users')
export class IamUsersPostController {
  constructor(readonly amqp: AmqpService) {}

  @Post('/signup')
  async signup(@Body() payload: SignupUserDTO) {
    const response = await this.amqp.request<AmqpResponse<{ id: string }>>({
      exchange: Exchange.IAM,
      routingKey: SignupUser.canonical,
      payload,
      timeout: RPC.timeout,
    })

    if (response.statusCode === HttpStatus.CONFLICT)
      throw response.message.startsWith(UserIdAlreadyExistsError.name)
        ? UserIdAlreadyExistsError.with(payload.id)
        : UserEmailAlreadyInUseError.with(payload.email)

    return response
  }
}
