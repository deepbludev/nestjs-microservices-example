import { Injectable } from '@nestjs/common'
import {
  SignupUserRequestDTOSchema,
  SignupUserResponseDTOSchema,
} from '@obeya/contexts/iam/application'
import { SignupUser } from '@obeya/contexts/iam/domain'
import { ICommandBus } from '@obeya/shared/core'
import { Context } from '@obeya/shared/domain'
import { amqpHandler, RpcController } from '@obeya/shared/infra/comms'
import { HttpError, HttpStatusCode } from '@obeya/shared/infra/http'

@Injectable()
export class SignupUserAmqpRpcController
  implements
    RpcController<SignupUserRequestDTOSchema, SignupUserResponseDTOSchema>
{
  constructor(private readonly commandbus: ICommandBus) {}

  @amqpHandler(Context.IAM, SignupUser)
  async run({ id, email, password }: SignupUserRequestDTOSchema) {
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
