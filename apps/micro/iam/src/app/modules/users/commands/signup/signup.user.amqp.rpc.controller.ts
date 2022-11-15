import { ICommandBus } from '@deepblu/ddd'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { SignupUser, SignupUserDTO } from '@obeya/contexts/iam/domain'
import { amqpHandler, Exchange, RpcController } from '@obeya/shared/infra/comms'

@Injectable()
export class SignupUserAmqpRpcController
  implements RpcController<SignupUserDTO, { id: string }>
{
  constructor(private readonly commandbus: ICommandBus) {}

  @amqpHandler(Exchange.IAM, SignupUser)
  async run({ id, email, password }: SignupUserDTO) {
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
          message: error.message,
          statusCode: (error as HttpException).getStatus(),
        }
  }
}
