import { Controller } from '@nestjs/common'
import { MessagePattern } from '@nestjs/microservices'

@Controller()
export class AppController {
  @MessagePattern('status')
  status() {
    return {
      message: '[IAM] All systems operational',
    }
  }
}
