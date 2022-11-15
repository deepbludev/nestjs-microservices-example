import {
  commandHandler,
  CommandResponse,
  ICommandHandler,
  Result,
} from '@deepblu/ddd'
import { Injectable } from '@nestjs/common'
import { SignupUser, UsersFactory, UsersRepo } from '@obeya/contexts/iam/domain'

@Injectable()
@commandHandler(SignupUser)
export class SignupUserHandler extends ICommandHandler<SignupUser> {
  constructor(private readonly repo: UsersRepo) {
    super()
  }
  async handle(command: SignupUser): CommandResponse {
    const { data: user, isFail, error } = UsersFactory.signup(command.payload)

    if (isFail) return Result.fail(error)

    this.repo.save(user)
    return Result.ok()
  }
}
