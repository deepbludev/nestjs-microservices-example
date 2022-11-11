import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { Controller, Get, HttpStatus } from '@nestjs/common'
import { Microservice } from '@obeya/shared/infra/comms'

@Controller('/iam')
export class IamHttpController {
  constructor(private readonly amqp: AmqpConnection) {}

  @Get()
  async status() {
    const response = await this.amqp.request<{ message: string }>({
      exchange: Microservice.IAM,
      routingKey: 'status',
      payload: {
        request: 'Hello, World!',
      },
      timeout: 10000,
    })
    const message = response?.message || '[IAM] Systems down'
    const statusCode = response
      ? HttpStatus.OK
      : HttpStatus.INTERNAL_SERVER_ERROR

    return { statusCode, message }
  }
}
