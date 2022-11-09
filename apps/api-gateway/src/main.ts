import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'

async function bootstrap() {
  const apiGateway = await NestFactory.create(AppModule)
  const config = apiGateway.get(ConfigService)
  const port = config.get('port')

  console.log({
    rmqUri: config.get('rmqUri'),
    rmqQueue: config.get('rmqQueue'),
  })

  await apiGateway.listen(port)
  Logger.log(`🚀 API Gateway is running on ${await apiGateway.getUrl()}`)
}

bootstrap()
