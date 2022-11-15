import { IEventBus, IUniqueID } from '@deepblu/ddd'
import { Injectable } from '@nestjs/common'
import { User, UsersRepo } from '@obeya/contexts/iam/domain'
import { UserId } from '@obeya/shared/domain'

@Injectable()
export class InMemoryUsersRepo extends UsersRepo {
  private users: Map<UserId, User> = new Map()

  constructor(readonly eventbus: IEventBus) {
    super(eventbus)
  }

  async get(id: IUniqueID): Promise<User> {
    return this.users.get(id)
  }

  protected async persist(user: User): Promise<void> {
    this.users.set(user.id, user)
  }

  async findByEmail(email: string): Promise<User | null> {
    this.users.forEach(user => {
      if (user.email.value === email) return Promise.resolve(user)
    })
    return Promise.resolve(null)
  }
}
