import { ConfigModule } from '@nestjs/config'

import { rmqConfig } from '@lean/shared/infra/comms'

import { portsConfig } from './ports.config'

export const IamConfigModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [portsConfig, rmqConfig],
})
