import { Controller, Get, HttpStatus, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { Microservice } from '@obeya/shared/infra/comms'
import { firstValueFrom } from 'rxjs'

@Controller('/iam')
export class IamController {
  constructor(@Inject(Microservice.IAM) readonly iam: ClientProxy) {}

  @Get()
  async status() {
    const response = await firstValueFrom(this.iam.send('status', {}))
    const message = response?.message || '[IAM] Systems down'
    const statusCode = response
      ? HttpStatus.OK
      : HttpStatus.INTERNAL_SERVER_ERROR

    return { statusCode, message }
  }
}
