import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'

async function bootstrap() {
  const iam = await NestFactory.create(AppModule)
  const config = iam.get(ConfigService)
  const port = config.get('port')

  await iam.listen(port)
  Logger.log(`🚀 IAM Microservice is running on ${await iam.getUrl()}`)
}

bootstrap()
