import { Module } from '@nestjs/common'
import { UsersRepo } from '@obeya/contexts/iam/domain'

import { InMemoryUsersRepo } from './in-memory.users.repo'

@Module({
  providers: [{ provide: UsersRepo, useClass: InMemoryUsersRepo }],
  exports: [UsersRepo],
})
export class UsersPersistenceModule {}
