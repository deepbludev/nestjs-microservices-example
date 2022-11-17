import { IEventBus } from '@deepblu/ddd'
import { Injectable } from '@nestjs/common'
import { User, UserDTO, UsersRepo } from '@obeya/contexts/iam/domain'
import { Nullable, UserId } from '@obeya/shared/domain'
import { MongoDbService, MongoDoc } from '@obeya/shared/infra/persistence'
import { Collection } from 'mongodb'

export type UserDoc = MongoDoc<UserDTO>

@Injectable()
export class MongoDbUsersRepo extends UsersRepo {
  constructor(
    protected readonly client: MongoDbService,
    readonly eventbus: IEventBus
  ) {
    super(eventbus)
  }

  get users(): Collection<UserDoc> {
    return this.client.db().collection<UserDoc>('users')
  }

  async get(id: UserId): Promise<Nullable<User>> {
    const doc: UserDoc = await this.users.findOne<UserDoc>({ _id: id.value })
    if (!doc) return null
    return User.from(doc)
  }

  async persist(user: User): Promise<void> {
    const dto = user.dto
    const doc: UserDoc = { ...dto, _id: dto.id }

    await this.users.updateOne(
      { _id: doc._id },
      { $set: doc },
      { upsert: true }
    )
  }

  async findByEmail(email: string): Promise<Nullable<User>> {
    const doc = await this.users.findOne<UserDoc>({ email })
    if (!doc) return null
    return User.from({ ...doc })
  }

  async clear(): Promise<void> {
    this.users.drop()
  }
}
