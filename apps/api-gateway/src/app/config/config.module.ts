import { ConfigModule } from '@nestjs/config'
import { rmqConfig } from '@obeya/shared/infra/comms'

import { portsConfig } from './ports.config'

export const ApiGatewayConfigModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [portsConfig, rmqConfig],
})
