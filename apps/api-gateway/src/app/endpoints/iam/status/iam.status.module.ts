import { Module } from '@nestjs/common'

import { IamStatusAmqpGetController } from './get/iam.status.amqp.get.controller'

@Module({
  controllers: [IamStatusAmqpGetController],
})
export class IamStatusModule {}
