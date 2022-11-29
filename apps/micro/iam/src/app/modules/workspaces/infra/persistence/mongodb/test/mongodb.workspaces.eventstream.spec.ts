import { ConfigModule } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import {
  CreateWorkspaceMother,
  Workspace,
  WorkspacesFactory,
} from '@obeya/contexts/iam/domain'
import { Context } from '@obeya/shared/domain'
import {
  mongodbConfig,
  MongoDbModule,
  MongoDbService,
} from '@obeya/shared/infra/persistence'

import { MongoDbWorkspacesEventStream } from '../mongodb.workspaces.eventstream'

describe(MongoDbWorkspacesEventStream, () => {
  let service: MongoDbService
  let stream: MongoDbWorkspacesEventStream

  const dto = CreateWorkspaceMother.fake()

  let workspace: Workspace

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [mongodbConfig] }),
        MongoDbModule.forRoot({ microservice: Context.TEST }),
      ],
    }).compile()

    service = module.get(MongoDbService)
    stream = new MongoDbWorkspacesEventStream(service)
    workspace = WorkspacesFactory.create(dto).data

    const changes = workspace.commit()
    await stream.store(workspace, changes)
  })

  afterEach(async () => {
    await service.db().dropDatabase()
    await service.client.close()
  })

  describe('#store & #get', () => {
    it.skip('stores and gets a workspace', async () => {
      expect(1).toEqual(1)
    })
  })
})
