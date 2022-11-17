import { Module } from '@nestjs/common'
import { UsersRepo } from '@obeya/contexts/iam/domain'

import { MongoDbUsersRepo } from './mongodb/mongodb.users.repo'

@Module({
  imports: [],
  providers: [{ provide: UsersRepo, useClass: MongoDbUsersRepo }],
  exports: [UsersRepo],
})
export class UsersPersistenceModule {}
