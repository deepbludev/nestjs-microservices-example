import { Controller, Get, HttpStatus } from '@nestjs/common'

@Controller('/iam')
export class IamController {
  @Get()
  status() {
    return {
      statusCode: HttpStatus.OK,
      message: '[IAM] All systems operational',
    }
  }
}
