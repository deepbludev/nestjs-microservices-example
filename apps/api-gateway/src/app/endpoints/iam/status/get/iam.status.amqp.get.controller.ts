import { Controller, Get } from '@nestjs/common'
import { AmqpService, Microservice, RPC } from '@obeya/shared/infra/comms'

@Controller('/iam')
export class IamStatusAmqpGetController {
  constructor(readonly amqp: AmqpService) {}

  @Get('/status')
  async status() {
    const { message } = await this.amqp.request<{ message: string }>({
      exchange: Microservice.IAM,
      routingKey: RPC.status.iam,
      timeout: RPC.timeout,
    })

    return { message }
  }
}
