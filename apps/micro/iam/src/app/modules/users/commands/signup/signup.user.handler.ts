import {
  commandHandler,
  CommandResponse,
  ICommandHandler,
  Result,
} from '@deepblu/ddd'
import { Injectable } from '@nestjs/common'
import { SignupUser } from '@obeya/contexts/iam/domain'

@Injectable()
@commandHandler(SignupUser)
export class SignupUserHandler extends ICommandHandler<SignupUser> {
  async handle(command: SignupUser): CommandResponse {
    console.log('handling command:', command)
    return Result.ok()
  }
}
