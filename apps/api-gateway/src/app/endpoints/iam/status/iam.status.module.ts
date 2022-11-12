import { Module } from '@nestjs/common'

import { IamStatusGetAmqpController } from './get/iam.status.get.amqp.controller'

@Module({
  controllers: [IamStatusGetAmqpController],
})
export class IamStatusModule {}
