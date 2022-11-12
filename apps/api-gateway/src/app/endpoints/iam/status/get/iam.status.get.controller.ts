import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { Controller, Get, HttpStatus } from '@nestjs/common'
import { Exchange } from '@obeya/shared/infra/comms'

@Controller('/iam')
export class IamStatusGetController {
  constructor(readonly amqp: AmqpConnection) {}

  @Get('/status')
  async status() {
    const response = await this.amqp.request<{ message: string }>({
      exchange: Exchange.IAM,
      routingKey: 'status',
      payload: {},
      timeout: 10000,
    })
    const message = response?.message || '[IAM] Systems down'
    const statusCode = response
      ? HttpStatus.OK
      : HttpStatus.INTERNAL_SERVER_ERROR

    return { statusCode, message }
  }
}
