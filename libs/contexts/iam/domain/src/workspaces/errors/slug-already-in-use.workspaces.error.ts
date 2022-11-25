import { HttpException, HttpStatus } from '@nestjs/common'

export class WorkspaceSlugAlreadyInUseError extends HttpException {
  constructor(slug: string) {
    super(`Slug ${slug} already in use`, HttpStatus.CONFLICT)
  }

  static with(slug: string) {
    return new WorkspaceSlugAlreadyInUseError(slug)
  }
}
