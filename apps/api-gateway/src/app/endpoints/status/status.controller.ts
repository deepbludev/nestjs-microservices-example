import { Controller, Get } from '@nestjs/common'

@Controller()
export class StatusController {
  @Get('status')
  status() {
    return {
      message: '[API] All systems operational',
    }
  }
}
