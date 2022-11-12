import { Module } from '@nestjs/common'

import { IamUsersPostController } from './post/iam.users.post.controller'

@Module({
  controllers: [IamUsersPostController],
})
export class IamUsersModule {}
