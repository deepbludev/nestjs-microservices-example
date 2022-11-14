import { ICommandBus } from '@deepblu/ddd'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { SignupUserDTO } from '@obeya/contexts/iam/domain'
import {
  amqpRpc,
  Exchange,
  RPC,
  RpcController,
} from '@obeya/shared/infra/comms'

import { SignupUser } from './signup.user.command'

@Injectable()
export class SignupUserAmqpRpcController
  implements RpcController<SignupUserDTO, { id: string }>
{
  constructor(private readonly commandbus: ICommandBus) {}
  @amqpRpc(Exchange.IAM)({ routingKey: RPC.iam.users.signup.command })
  async run({ id, email }: SignupUserDTO) {
    const { isOk } = await this.commandbus.dispatch(
      SignupUser.with({ id, email })
    )

    return isOk
      ? {
          data: { id },
          message: `User ${email} created`,
          status: HttpStatus.CREATED,
        }
      : new HttpException('Invalid credentials', HttpStatus.FORBIDDEN)
  }
}
