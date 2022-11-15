import { AggregateRepoMock } from '@obeya/shared/domain'

import { User } from '../../model/user.aggregate'
import { UsersRepo } from '../../services/users.repo'

export class UsersRepoMock
  extends AggregateRepoMock<User>
  implements UsersRepo
{
  findByEmail: (email: string) => Promise<User | null> = jest.fn()
  clear() {
    this.aggregates.clear()
  }
}
