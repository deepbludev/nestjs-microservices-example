import { Logger } from '@nestjs/common'
// import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { Microservice } from '@obeya/shared/infra/comms'

import { IamMicroserviceModule } from './app/iam.microservice.module'

async function bootstrap() {
  const iam = await NestFactory.create(IamMicroserviceModule)
  await iam.init()
  Logger.log(
    `🚀 IAM Microservice is running on amqp queue: ${Microservice.IAM}`
  )
}

bootstrap()
