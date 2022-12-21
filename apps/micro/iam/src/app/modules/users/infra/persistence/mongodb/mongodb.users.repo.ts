import { Injectable } from '@nestjs/common'
import { User, UserDTO, UsersRepo } from '@obeya/contexts/iam/domain'
import { Nullable } from '@obeya/shared/core'
import { MongoDbRepo, MongoDoc } from '@obeya/shared/infra/persistence'

export type UserDoc = MongoDoc<UserDTO>

@Injectable()
export class MongoDbUsersRepo
  extends MongoDbRepo<User, UserDTO>
  implements UsersRepo
{
  aggregate = User.name
  mapper = User.from

  async findByEmail(email: string): Promise<Nullable<User>> {
    return (await this.findBy({ email }))[0]
  }
}
