import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { Microservice, RmqService } from '@obeya/shared/infra/comms'

import { AppModule } from './app/app.module'

async function bootstrap() {
  const iam = await NestFactory.create(AppModule)
  iam.connectMicroservice(iam.get(RmqService).connect(Microservice.IAM))
  await iam.startAllMicroservices()
  Logger.log(
    `🚀 IAM Microservice running subscribed to queue: ${Microservice.IAM}`
  )
}

bootstrap()
