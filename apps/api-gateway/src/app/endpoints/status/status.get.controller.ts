import { Controller, Get } from '@nestjs/common'

@Controller()
export class StatusGetController {
  @Get('status')
  status() {
    return {
      message: '[API] All systems operational',
    }
  }
}
