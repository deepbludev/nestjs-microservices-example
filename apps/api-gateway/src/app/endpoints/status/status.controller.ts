import { Controller, Get, HttpStatus } from '@nestjs/common'

@Controller()
export class StatusController {
  @Get('status')
  status() {
    return {
      statusCode: HttpStatus.OK,
      message: '[API] All systems operational',
    }
  }
}
