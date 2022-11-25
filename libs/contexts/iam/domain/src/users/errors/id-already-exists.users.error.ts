import { HttpException, HttpStatus } from '@nestjs/common'

export class UserIdAlreadyExistsError extends HttpException {
  constructor(id: string) {
    super(`User with id ${id} already exists`, HttpStatus.CONFLICT)
  }

  static with(id: string) {
    return new UserIdAlreadyExistsError(id)
  }
}
