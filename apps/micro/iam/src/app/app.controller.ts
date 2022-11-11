import { Controller } from '@nestjs/common'
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices'
import { RmqService } from '@obeya/shared/infra/comms'

@Controller()
export class AppController {
  constructor(private readonly rmqService: RmqService) {}
  @MessagePattern('status')
  status(
    @Payload() payload: Record<string, unknown>,
    @Ctx() context: RmqContext
  ) {
    console.log('RECEIVED in IAM: ', {
      message: context.getPattern(),
      payload,
    })
    this.rmqService.ack(context)

    return {
      message: '[IAM] All systems operational',
    }
  }
}
