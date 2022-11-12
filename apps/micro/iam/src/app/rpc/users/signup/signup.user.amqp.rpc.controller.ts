import { Result } from '@deepblu/ddd'
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq'
import { SignupUserDTO } from '@obeya/contexts/iam/domain'
import { rpc } from '@obeya/shared/infra/comms'

import { iamAmqpRpc } from '../../../utils/iam.amqp.rpc.decorator'

export class SignupUserAmqpRpcController {
  @iamAmqpRpc(rpc.iam.users.signup.command)
  async run(dto: SignupUserDTO) {
    const result = Result.ok({
      message: `User ${dto.email} created`,
    })

    return result.data
  }
}
