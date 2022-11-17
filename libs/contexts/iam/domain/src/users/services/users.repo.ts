import { IEventPublisherRepo } from '@deepblu/ddd'
import { Injectable } from '@nestjs/common'
import { Nullable } from '@obeya/shared/domain'

import { User } from '../model/user.aggregate'

@Injectable()
export abstract class UsersRepo extends IEventPublisherRepo<User> {
  abstract findByEmail(email: string): Promise<Nullable<User>>
}
