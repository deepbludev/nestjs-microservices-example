import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { Controller, Get } from '@nestjs/common'
import { Exchange } from '@obeya/shared/infra/comms'

@Controller('/iam')
export class IamStatusGetAmqpController {
  constructor(readonly amqp: AmqpConnection) {}

  @Get('/status')
  async status() {
    const response = await this.amqp.request<{ message: string }>({
      exchange: Exchange.IAM,
      routingKey: 'status',
      payload: {},
      timeout: 10000,
    })

    return {
      message: response?.message,
    }
  }
}
