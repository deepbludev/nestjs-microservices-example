import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common'
import {
  SignupUser,
  SignupUserRequestDTOSchema,
  SignupUserResponseDTOSchema,
} from '@obeya/contexts/iam/domain'
import { Context } from '@obeya/shared/domain'
import { AmqpService, RPC, RpcResponse } from '@obeya/shared/infra/comms'

@Controller()
export class IamUsersPostController {
  constructor(readonly amqp: AmqpService) {}

  @Post(SignupUser.path())
  async signup(
    @Body() payload: SignupUserRequestDTOSchema
  ): Promise<RpcResponse<SignupUserResponseDTOSchema>> {
    const response = await this.amqp.request<
      RpcResponse<SignupUserResponseDTOSchema>
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
