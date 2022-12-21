import { Body, Controller, Post } from '@nestjs/common'
import { CreateWorkspaceRequestDTOSchema } from '@obeya/contexts/iam/application'
import {
  CreateWorkspace,
  CreateWorkspaceResponseDTO,
} from '@obeya/contexts/iam/domain'
import { Context } from '@obeya/shared/domain'
import { AmqpService, RPC } from '@obeya/shared/infra/comms'
import {
  HttpError,
  HttpResponse,
  HttpStatusCode,
} from '@obeya/shared/infra/http'

@Controller()
export class IamWorkspacesCommandsController {
  constructor(readonly amqp: AmqpService) {}

  @Post(CreateWorkspace.path())
  async create(
    @Body() payload: CreateWorkspaceRequestDTOSchema
  ): Promise<HttpResponse<CreateWorkspaceResponseDTO>> {
    const response = await this.amqp.request<
      HttpResponse<CreateWorkspaceResponseDTO>
    >({
      exchange: Context.IAM,
      routingKey: CreateWorkspace.canonical,
      payload,
      timeout: RPC.timeout,
    })

    if (response.statusCode === HttpStatusCode.CREATED) return response

    throw response.statusCode === HttpStatusCode.CONFLICT
      ? HttpError.with(response)
      : HttpError.server(response.message)
  }
}
