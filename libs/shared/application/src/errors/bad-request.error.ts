import { HttpException, HttpStatus } from '@nestjs/common'

export class BadRequestError extends HttpException {
  constructor(errorOrMessage: Error | string | string[]) {
    super(
      (errorOrMessage as Error).message || errorOrMessage,
      HttpStatus.BAD_REQUEST
    )
  }

  static with(error: Error | string | string[]) {
    return new BadRequestError(error)
  }
}
