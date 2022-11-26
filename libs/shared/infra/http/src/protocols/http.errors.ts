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
      message,
      data: null,
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    })
  }
}
