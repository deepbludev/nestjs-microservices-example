import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { SignupUserMother, User } from '@obeya/contexts/iam/domain'
import { IEventBus } from '@obeya/shared/core'
import { Context } from '@obeya/shared/domain'
import {
  mongodbConfig,
  MongoDbModule,
  MongoDbService,
} from '@obeya/shared/infra/persistence'

import { MongoDbUsersRepo } from '../mongodb.users.repo'

describe(MongoDbUsersRepo, () => {
  let service: MongoDbService
  let repo: MongoDbUsersRepo

  const dto = SignupUserMother.fake()
  const user = User.from({ ...dto, version: 1 })

  const eventbus: IEventBus = { publish: jest.fn(), register: jest.fn() }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [mongodbConfig] }),
        MongoDbModule.forRoot({ microservice: Context.TEST }),
      ],
    }).compile()

    service = module.get(MongoDbService)
    repo = new MongoDbUsersRepo(service, eventbus)

    const user = User.from({ ...dto, version: 1 })
    await repo.persist(user)
  })

  afterEach(async () => {
    await service.db().dropDatabase()
    await service.client.close()
  })

  describe('#get and #persist', () => {
    it('persists and gets users', async () => {
      const persistedUser = await repo.get(user.id)
      expect(persistedUser).toEqual(user)
    })
  })

  describe('#findByEmail', () => {
    it('finds users by email', async () => {
      const persistedUser = await repo.findByEmail(dto.email)
      expect(persistedUser).toEqual(user)
    })
  })

  describe('#clear', () => {
    it('clears the collection', async () => {
      await repo.clear()
      const persistedUser = await repo.get(user.id)
      expect(persistedUser).toBeNull()
    })
  })
})
