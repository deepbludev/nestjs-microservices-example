import { Body, Controller, Post } from '@nestjs/common'
import {
  SignupUser,
  SignupUserResponseDTO,
} from '@obeya/contexts/iam/application'
import { Context } from '@obeya/shared/domain'
import { AmqpService, RPC } from '@obeya/shared/infra/comms'
import {
  HttpError,
  HttpResponse,
  HttpStatusCode,
} from '@obeya/shared/infra/http'

import { SignupUserRequestDTOSchema } from './users.command.dto.schema'

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

    const { CREATED, CONFLICT, BAD_REQUEST } = HttpStatusCode
    if (response.statusCode === CREATED) return response

    throw [CONFLICT, BAD_REQUEST].includes(response.statusCode)
      ? HttpError.with(response)
      : HttpError.server(response.message)
  }
}
