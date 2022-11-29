import { HttpStatus } from '@nestjs/common'
import { fakeCreateWorkspaceDTO } from '@obeya/contexts/iam/domain'
import { Context } from '@obeya/shared/domain'
import { MongoDbService } from '@obeya/shared/infra/persistence'

import { ApiGatewayModule } from '../../../../../../src/app/api-gateway.module'
import { TestEnvironment } from '../../../../../utils'

describe('IAM/Workspaces AllWorkspaces Query (e2e)', () => {
  let api: TestEnvironment
  let dbService: MongoDbService

  beforeAll(async () => {
    api = await TestEnvironment.init(ApiGatewayModule)
    dbService = api.module.get(MongoDbService)
    await dbService.collection('Workspace', Context.IAM).deleteMany({})
  })

  afterEach(async () => {
    await dbService.collection('Workspace', Context.IAM).deleteMany({})
  })

  afterAll(async () => {
    await api.close()
  })

  describe('GET /iam/workspaces/all', () => {
    const req = () => api.request().post('/iam/workspaces/all')

    it.skip('returns all workspaces', async () => {
      const workspace = fakeCreateWorkspaceDTO()
      const otherWorkspace = fakeCreateWorkspaceDTO({ slug: 'other-workspace' })

      await api.request().post('/iam/workspaces/create').send(workspace)
      await api.request().post('/iam/workspaces/create').send(otherWorkspace)

      return req()
        .expect(HttpStatus.OK)
        .expect({
          data: [
            {
              id: workspace.id,
              name: workspace.name,
              slug: workspace.slug,
            },
            {
              id: otherWorkspace.id,
              name: otherWorkspace.name,
              slug: otherWorkspace.slug,
            },
          ],
          message: 'Workspaces returned',
          statusCode: 200,
        })
    })
  })
})
