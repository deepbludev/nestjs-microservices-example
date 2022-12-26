import { Injectable } from '@nestjs/common'
import {
  UserEmailAlreadyInUseError,
  UserIdAlreadyExistsError,
  UsersFactory,
  UsersRepo,
} from '@obeya/contexts/iam/domain'
import { BadRequestError } from '@obeya/shared/application'
import {
  commandHandler,
  CommandResponse,
  ICommandHandler,
  Result,
} from '@obeya/shared/core'

import { SignupUser } from './signup.user.command'

@Injectable()
@commandHandler(SignupUser)
export class SignupUserHandler extends ICommandHandler<SignupUser> {
  constructor(
    private readonly repo: UsersRepo,
    private readonly factory: UsersFactory
  ) {
    super()
  }
  async handle(command: SignupUser): CommandResponse {
    const { data: user, isFail, error } = this.factory.create(command.payload)
    if (isFail) return Result.fail(BadRequestError.with(error))

    if (await this.repo.exists(user.id))
      return Result.fail(new UserIdAlreadyExistsError(user.id.value))

    if (await this.repo.findByEmail(user.email.value))
      return Result.fail(new UserEmailAlreadyInUseError(user.email.value))

    this.repo.save(user)
    return Result.ok()
  }
}
