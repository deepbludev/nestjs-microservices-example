import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { IamMicroserviceModule } from './app/iam.microservice.module'

async function bootstrap() {
  const iam = await NestFactory.create(IamMicroserviceModule)
  const config = iam.get(ConfigService)
  const port = config.get('port')

  await iam.listen(port)
  Logger.log(`🚀 IAM Microservice is running on ${await iam.getUrl()}`)
}

bootstrap()
