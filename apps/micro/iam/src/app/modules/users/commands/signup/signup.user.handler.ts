import {
  commandHandler,
  CommandResponse,
  ICommandHandler,
  Result,
} from '@deepblu/ddd'
import { Injectable } from '@nestjs/common'

import { SignupUser } from './signup.user.command'

@Injectable()
@commandHandler(SignupUser)
export class SignupUserHandler extends ICommandHandler<SignupUser> {
  constructor() {
    super()
  }
  async handle({ payload }: SignupUser): CommandResponse {
    console.log('handling command:', { payload })
    return Result.ok()
  }
}
