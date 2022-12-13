import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { Context } from '@obeya/shared/domain'

import { IamMicroserviceModule } from './app/iam.microservice.module'

async function bootstrap() {
  const iam = await NestFactory.create(IamMicroserviceModule)
  iam.enableShutdownHooks()
  await iam.init()
  Logger.log(`🚀 IAM Microservice is running on amqp queue: ${Context.IAM}`)
}

bootstrap()
