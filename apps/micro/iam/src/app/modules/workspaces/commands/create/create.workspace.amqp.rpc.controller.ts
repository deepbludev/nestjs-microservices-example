import { Injectable } from '@nestjs/common'
import {
  CreateWorkspace,
  CreateWorkspaceRequestDTO,
  CreateWorkspaceResponseDTO,
} from '@obeya/contexts/iam/domain'
import { ICommandBus } from '@obeya/shared/core'
import { Context } from '@obeya/shared/domain'
import { amqpHandler, RpcController } from '@obeya/shared/infra/comms'
import { HttpError, HttpStatusCode } from '@obeya/shared/infra/http'

@Injectable()
export class CreateWorkspaceAmqpRpcController
  implements
    RpcController<CreateWorkspaceRequestDTO, CreateWorkspaceResponseDTO>
{
  constructor(private readonly commandbus: ICommandBus) {}

  @amqpHandler(Context.IAM, CreateWorkspace)
  async run({ id, name, slug }: CreateWorkspaceRequestDTO) {
    const { isOk, error } = await this.commandbus.dispatch(
      CreateWorkspace.with({ id, name, slug })
    )

    return isOk
      ? {
          data: { id },
          message: `Workspace ${name} (${slug}) created`,
          statusCode: HttpStatusCode.CREATED,
        }
      : HttpError.response(error)
  }
}
