import { RabbitRPC } from '@golevelup/nestjs-rabbitmq'
import { Microservice } from '@obeya/shared/infra/comms'

export class AppRpcController {
  @RabbitRPC({
    exchange: Microservice.IAM,
    routingKey: 'status',
    queue: 'iam-status-queue',
  })
  async status(msg: { request: string }) {
    console.log('RECEIVED in IAM: ', msg)
    return {
      message: '[IAM] All systems operational',
    }
  }
}
