import { Injectable } from '@nestjs/common'
import {
  CreateWorkspaceRequestDTOSchema,
  CreateWorkspaceResponseDTOSchema,
} from '@obeya/contexts/iam/application'
import { CreateWorkspace } from '@obeya/contexts/iam/domain'
import { ICommandBus } from '@obeya/shared/core'
import { Context } from '@obeya/shared/domain'
import { amqpHandler, RpcController } from '@obeya/shared/infra/comms'
import { HttpError, HttpStatusCode } from '@obeya/shared/infra/http'

@Injectable()
export class CreateWorkspaceAmqpRpcController
  implements
    RpcController<
      CreateWorkspaceRequestDTOSchema,
      CreateWorkspaceResponseDTOSchema
    >
{
  constructor(private readonly commandbus: ICommandBus) {}

  @amqpHandler(Context.IAM, CreateWorkspace)
  async run({ id, name, slug }: CreateWorkspaceRequestDTOSchema) {
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
