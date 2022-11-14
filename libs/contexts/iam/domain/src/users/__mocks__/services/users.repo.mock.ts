import { AggregateRepoMock } from '@obeya/shared/domain'

import { User } from '../../model/user.aggregate'
import { UsersRepo } from '../../services/users.repo'

export class UsersRepoMock
  extends AggregateRepoMock<User>
  implements UsersRepo {}
