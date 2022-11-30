import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { CreateWorkspaceMother, Workspace } from '@obeya/contexts/iam/domain'
import { IEventBus } from '@obeya/shared/core'
import { Context } from '@obeya/shared/domain'
import {
  mongodbConfig,
  MongoDbModule,
  MongoDbService,
} from '@obeya/shared/infra/persistence'

import { MongoDbWorkspacesRepo } from '../mongodb.workspaces.repo'

describe(MongoDbWorkspacesRepo, () => {
  let service: MongoDbService
  let repo: MongoDbWorkspacesRepo

  const dto = CreateWorkspaceMother.fake()
  const workspace = Workspace.from({ ...dto, version: 1 })

  const eventbus: IEventBus = { publish: jest.fn(), register: jest.fn() }

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [mongodbConfig] }),
        MongoDbModule.forRoot({ microservice: Context.TEST }),
      ],
    }).compile()

    service = module.get(MongoDbService)
    repo = new MongoDbWorkspacesRepo(service, eventbus)

    const workspace = Workspace.from({ ...dto, version: 1 })
    await repo.persist(workspace)
  })

  afterEach(async () => {
    await service.db().collection('Workspace').deleteMany({})
    await service.client.close()
  })

  describe('#get and #persist', () => {
    it('persists and gets workspaces', async () => {
      const persistedWorkspace = await repo.get(workspace.id)
      expect(persistedWorkspace).toEqual(workspace)
    })
  })

  describe('#findBySlug', () => {
    it('finds workspaces by slug', async () => {
      const persistedWorkspace = await repo.findBySlug(dto.slug)
      expect(persistedWorkspace).toEqual(workspace)
    })
  })

  describe('#clear', () => {
    it('clears the collection', async () => {
      await repo.clear()
      const persistedWorkspace = await repo.get(workspace.id)
      expect(persistedWorkspace).toBeNull()
    })
  })
})
