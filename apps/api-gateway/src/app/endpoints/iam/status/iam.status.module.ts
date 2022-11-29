import { Module } from '@nestjs/common'

import { IamStatusAmqpQueryController } from './queries/iam.status.amqp.query.controller'

@Module({
  controllers: [IamStatusAmqpQueryController],
})
export class IamStatusModule {}
