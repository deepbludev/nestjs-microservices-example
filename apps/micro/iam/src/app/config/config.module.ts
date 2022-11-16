import { ConfigModule } from '@nestjs/config'
import { mongodbConfig } from '@obeya/shared/infra'
import { amqpConfig } from '@obeya/shared/infra/comms'

import { portsConfig } from './ports.config'

export const IamConfigModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [portsConfig, amqpConfig, mongodbConfig],
})
