import { Injectable } from '@nestjs/common'
import { IEventPublisherRepo } from '@obeya/shared/core'
import { Nullable } from '@obeya/shared/domain'

import { User } from '../model/user.aggregate'

@Injectable()
export abstract class UsersRepo extends IEventPublisherRepo<User> {
  abstract findByEmail(email: string): Promise<Nullable<User>>
}
