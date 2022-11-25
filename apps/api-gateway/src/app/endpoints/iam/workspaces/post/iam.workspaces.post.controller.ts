import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common'
import { CreateWorkspaceRequestDTOSchema } from '@obeya/contexts/iam/application'
import {
  CreateWorkspace,
  CreateWorkspaceResponseDTO,
} from '@obeya/contexts/iam/domain'
import { Context } from '@obeya/shared/domain'
import { AmqpService, RPC, RpcResponse } from '@obeya/shared/infra/comms'

@Controller()
export class IamWorkspacesPostController {
  constructor(readonly amqp: AmqpService) {}

  @Post(CreateWorkspace.path())
  async create(
    @Body() payload: CreateWorkspaceRequestDTOSchema
  ): Promise<RpcResponse<CreateWorkspaceResponseDTO>> {
    const response = await this.amqp.request<
      RpcResponse<CreateWorkspaceResponseDTO>
    >({
      exchange: Context.IAM,
      routingKey: CreateWorkspace.canonical,
      payload,
      timeout: RPC.timeout,
    })

    if (response.statusCode !== HttpStatus.CREATED)
      throw new HttpException(response.message, response.statusCode)

    return response
  }
}
