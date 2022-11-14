import { Result } from '@deepblu/ddd'
import { HttpException, HttpStatus } from '@nestjs/common'
import { SignupUserDTO } from '@obeya/contexts/iam/domain'
import { RPC, RpcController } from '@obeya/shared/infra/comms'

import { iamAmqpRpc } from '../../../utils/iam.amqp.rpc.decorator'

export class SignupUserAmqpRpcController
  implements RpcController<SignupUserDTO, { id: string }>
{
  @iamAmqpRpc(RPC.iam.users.signup.command)
  async run({ id, email }: SignupUserDTO) {
    try {
      const { data, isOk } = Result.ok({ id })

      return isOk
        ? {
            data,
            message: `User ${email} created`,
            status: HttpStatus.CREATED,
          }
        : new HttpException('Invalid credentials', HttpStatus.FORBIDDEN)
    } catch (error) {
      return error
    }
  }
}
