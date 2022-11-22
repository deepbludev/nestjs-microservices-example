import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common'
import {
  SignupUser,
  SignupUserRequestDTO,
  SignupUserResponseDTO,
} from '@obeya/contexts/iam/domain'
import { Context } from '@obeya/shared/domain'
import { AmqpService, RPC, RpcResponse } from '@obeya/shared/infra/comms'

@Controller('/iam/users')
export class IamUsersPostController {
  constructor(readonly amqp: AmqpService) {}

  @Post('/signup')
  async signup(
    @Body() payload: SignupUserRequestDTO
  ): Promise<RpcResponse<SignupUserResponseDTO>> {
    const response = await this.amqp.request<
      RpcResponse<SignupUserResponseDTO>
    >({
      exchange: Context.IAM,
      routingKey: SignupUser.canonical,
      payload,
      timeout: RPC.timeout,
    })

    if (response.statusCode !== HttpStatus.CREATED)
      throw new HttpException(response.message, response.statusCode)

    return response
  }
}
