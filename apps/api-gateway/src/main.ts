import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { ApiGatewayModule } from './app/api-gateway.module'

async function bootstrap() {
  const apiGateway = await NestFactory.create(ApiGatewayModule)

  apiGateway.useGlobalPipes(new ValidationPipe())
  apiGateway.enableCors()
  apiGateway.enableShutdownHooks()

  const port = apiGateway.get(ConfigService).get('port')
  await apiGateway.listen(port)
  Logger.log(`🚀 API Gateway is running on ${await apiGateway.getUrl()}`)
}

bootstrap()
