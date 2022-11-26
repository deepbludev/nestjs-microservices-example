import { HttpException } from '@nestjs/common'

import { HttpResponse } from './http.response'
import { HttpStatusCode } from './status-code.http'

export class HttpError<D = void> extends HttpException {
  constructor(response: HttpResponse<D>) {
    super(response.message, response.statusCode)
  }

  static with<D = void>(response: HttpResponse<D>): HttpError {
    return new HttpError(response)
  }

  static server(message: string): HttpError {
    return new HttpError({
      data: null,
      message,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    })
  }

  static response(error: Error) {
    let statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR
    if (error instanceof HttpException) statusCode = error.getStatus()

    return {
      data: null,
      message: error.message,
      statusCode,
    }
  }
}
