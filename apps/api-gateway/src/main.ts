import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'

async function bootstrap() {
  const apiGateway = await NestFactory.create(AppModule)
  const port = apiGateway.get(ConfigService).get('port')

  await apiGateway.listen(port)
  Logger.log(`🚀 API Gateway is running on ${await apiGateway.getUrl()}`)
}

bootstrap()
