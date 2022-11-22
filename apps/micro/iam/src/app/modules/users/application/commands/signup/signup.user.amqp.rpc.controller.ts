import { ICommandBus } from '@deepblu/ddd'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import {
  SignupUser,
  SignupUserRequestDTO,
  SignupUserResponseDTO,
} from '@obeya/contexts/iam/domain'
import { Context } from '@obeya/shared/domain'
import { amqpHandler, RpcController } from '@obeya/shared/infra/comms'

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
          statusCode: HttpStatus.CREATED,
        }
      : {
          data: null,
          message: error.message,
          statusCode: (error as HttpException).getStatus(),
        }
  }
}
