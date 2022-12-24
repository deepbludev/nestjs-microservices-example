import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { createMock } from '@golevelup/ts-jest'

import { AmqpService } from '../amqp/amqp.service'

export const amqpServiceMock = new AmqpService(createMock<AmqpConnection>())
