import { Global, Module } from '@nestjs/common'

import { UsersPersistenceModule } from './persistence/users/users.persistence.module'

@Global()
@Module({
  imports: [UsersPersistenceModule],
  exports: [UsersPersistenceModule],
})
export class UsersInfraModule {}
