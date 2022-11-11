import { ConfigModule } from '@nestjs/config'
import { amqpConfig } from '@obeya/shared/infra/comms'

import { portsConfig } from './ports.config'

export const IamConfigModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [portsConfig, amqpConfig],
})
