import { Body, Controller, Post } from '@nestjs/common'
import {
  CreateWorkspace,
  CreateWorkspaceResponseDTO,
} from '@obeya/contexts/iam/application'
import { Context } from '@obeya/shared/domain'
import { AmqpService, RPC } from '@obeya/shared/infra/comms'
import {
  HttpError,
  HttpResponse,
  HttpStatusCode,
} from '@obeya/shared/infra/http'

import { CreateWorkspaceRequestDTOSchema } from './workspaces.command.dto.schema'

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

    const { CREATED, CONFLICT, BAD_REQUEST } = HttpStatusCode
    if (response.statusCode === CREATED) return response

    throw [CONFLICT, BAD_REQUEST].includes(response.statusCode)
      ? HttpError.with(response)
      : HttpError.server(response.message)
  }
}
