import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { ApiGatewayModule } from './app/api-gateway.module'

async function bootstrap() {
  const apiGateway = await NestFactory.create(ApiGatewayModule)
  const config = apiGateway.get(ConfigService)
  const port = config.get('port')

  await apiGateway.listen(port)
  Logger.log(`🚀 API Gateway is running on ${await apiGateway.getUrl()}`)
}

bootstrap()
