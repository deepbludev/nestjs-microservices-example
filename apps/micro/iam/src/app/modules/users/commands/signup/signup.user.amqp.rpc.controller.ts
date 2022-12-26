import { Injectable } from '@nestjs/common'
import {
  SignupUser,
  SignupUserRequestDTO,
  SignupUserResponseDTO,
} from '@obeya/contexts/iam/application'
import { ICommandBus } from '@obeya/shared/core'
import { Context } from '@obeya/shared/domain'
import { amqpHandler, RpcController } from '@obeya/shared/infra/comms'
import { HttpError, HttpStatusCode } from '@obeya/shared/infra/http'

@Injectable()
export class SignupUserAmqpRpcController
  implements RpcController<SignupUserRequestDTO, SignupUserResponseDTO>
{
  constructor(private readonly commandbus: ICommandBus) {}

  @amqpHandler(Context.IAM, SignupUser)
  async run({ id, email, password }: SignupUserRequestDTO) {
    const { isOk, error } = await this.commandbus.dispatch(
      SignupUser.with({ id, email, password })
    )

    return isOk
      ? {
          data: { id },
          message: `User ${email} created`,
          statusCode: HttpStatusCode.CREATED,
        }
      : HttpError.response(error)
  }
}
