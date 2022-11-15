import { Global, Module } from '@nestjs/common'
import { UsersFactory } from '@obeya/contexts/iam/domain'

import { UsersPersistenceModule } from './persistence/users/users.persistence.module'

@Global()
@Module({
  imports: [UsersPersistenceModule],
  providers: [UsersFactory],
  exports: [UsersPersistenceModule, UsersFactory],
})
export class UsersInfraModule {}
