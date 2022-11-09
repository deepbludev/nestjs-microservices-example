import { ConfigModule } from '@nestjs/config'
import { portsConfig } from './ports.config'

export const ApiGatewayConfigModule = ConfigModule.forRoot({
  load: [portsConfig],
})
