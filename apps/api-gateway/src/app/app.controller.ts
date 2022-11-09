import { Controller, Get, HttpStatus } from '@nestjs/common'

@Controller()
export class AppController {
  @Get('status')
  status() {
    return {
      statusCode: HttpStatus.OK,
      message: '[api-gateway] All systems operational.',
    }
  }
}
