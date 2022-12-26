import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { ZodSchema } from 'zod'

@Injectable()
export class BodyValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(value: any) {
    const result = this.schema.safeParse(value)
    if (!result.success) {
      const error = result.error.issues.map(
        issue => `[${issue.path.join('.')}] ${issue.message}`
      )
      throw new BadRequestException(error)
    }

    return value
  }
}
