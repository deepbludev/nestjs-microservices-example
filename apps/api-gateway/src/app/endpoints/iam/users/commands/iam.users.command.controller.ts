import { Body, Controller, Post } from '@nestjs/common'
import { SignupUserRequestDTOSchema } from '@obeya/contexts/iam/application'
import { SignupUser, SignupUserResponseDTO } from '@obeya/contexts/iam/domain'
import { Context } from '@obeya/shared/domain'
import { AmqpService, RPC } from '@obeya/shared/infra/comms'
import {
  HttpError,
  HttpResponse,
  HttpStatusCode,
} from '@obeya/shared/infra/http'

@Controller()
export class IamUsersCommandController {
  constructor(readonly amqp: AmqpService) {}

  @Post(SignupUser.path())
  async signup(
    @Body() payload: SignupUserRequestDTOSchema
  ): Promise<HttpResponse<SignupUserResponseDTO>> {
    const response = await this.amqp.request<
      HttpResponse<SignupUserResponseDTO>
    >({
      exchange: Context.IAM,
      routingKey: SignupUser.canonical,
      payload,
      timeout: RPC.timeout,
    })

    if (response.statusCode === HttpStatusCode.CREATED) return response

    throw response.statusCode === HttpStatusCode.CONFLICT
      ? HttpError.with(response)
      : HttpError.server(response.message)
  }
}
