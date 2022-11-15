import { HttpException, HttpStatus } from '@nestjs/common'

export class UserEmailAlreadyInUseError extends HttpException {
  constructor(email: string) {
    super(`Email ${email} already in use`, HttpStatus.CONFLICT)
  }

  static with(email: string) {
    return new UserEmailAlreadyInUseError(email)
  }
}
