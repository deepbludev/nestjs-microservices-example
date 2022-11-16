import { IEventBus } from '@deepblu/ddd'
import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { signupUserDTOStub, User } from '@obeya/contexts/iam/domain'
import {
  mongodbConfig,
  MongoDbModule,
  MongoDbService,
} from '@obeya/shared/infra'
import { Microservice } from '@obeya/shared/infra/comms'

import { MongoDbUsersRepo } from './mongodb.users.repo'

describe(MongoDbUsersRepo, () => {
  let service: MongoDbService
  let repo: MongoDbUsersRepo

  const dto = signupUserDTOStub()
  const user = User.fromDTO(dto)

  const eventbus: IEventBus = { publish: jest.fn(), register: jest.fn() }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [mongodbConfig] }),
        MongoDbModule.forRoot({ microservice: Microservice.TEST }),
      ],
    }).compile()

    service = module.get(MongoDbService)
    repo = new MongoDbUsersRepo(service, eventbus)

    const user = User.fromDTO(dto)
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
