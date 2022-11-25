import { HttpException, HttpStatus } from '@nestjs/common'

export class WorkspaceIdAlreadyExistsError extends HttpException {
  constructor(id: string) {
    super(`Workspace with id ${id} already exists`, HttpStatus.CONFLICT)
  }

  static with(id: string) {
    return new WorkspaceIdAlreadyExistsError(id)
  }
}
