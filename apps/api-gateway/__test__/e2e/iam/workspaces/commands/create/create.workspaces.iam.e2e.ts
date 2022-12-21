import { HttpStatus } from '@nestjs/common'
import {
  CreateWorkspaceMother,
  CreateWorkspaceRequestDTO,
  WorkspaceIdAlreadyExistsError,
  WorkspaceSlugAlreadyInUseError,
} from '@obeya/contexts/iam/domain'
import { Context } from '@obeya/shared/domain'
import { MongoDbService } from '@obeya/shared/infra/persistence'

import { ApiGatewayModule } from '../../../../../../src/app/api-gateway.module'
import { TestEnvironment } from '../../../../../utils'

describe('IAM/Workspaces CreateWorkspace Command (e2e)', () => {
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

  describe('POST /iam/workspaces/create', () => {
    const createWorkspaceCommand = () =>
      api.request().post('/iam/workspaces/create')

    const errorMessages = [
      'workspace id must be a valid UUID',
      'workspace name is not valid',
      'slug must be alphanumeric kebab-case of less than 64 characthers',
    ]

    describe('when name and slug are valid', () => {
      it('creates a valid workspace', () => {
        const workspace = CreateWorkspaceMother.fake()

        return createWorkspaceCommand()
          .send(workspace)
          .expect(HttpStatus.CREATED)
          .expect({
            data: { id: workspace.id },
            message:
              'Workspace Valid Workspace Name (valid-workspace-slug) created',
            statusCode: 201,
          })
      })

      describe('when workspace already exists', () => {
        it('fails with same Workspace ID', async () => {
          const workspace = CreateWorkspaceMother.fake()
          const otherWorkspaceWithSameId = CreateWorkspaceMother.fake({
            slug: 'other-workspace',
          })

          await api.request().post('/iam/workspaces/create').send(workspace)

          return createWorkspaceCommand()
            .send(otherWorkspaceWithSameId)
            .expect(HttpStatus.CONFLICT)
            .expect({
              message: WorkspaceIdAlreadyExistsError.with(workspace.id).message,
              statusCode: 409,
            })
        })

        it('fails with same slug', async () => {
          const id = '12e8a297-59f6-4614-b5ec-13b45249531f'
          const otherId = '4e6beba7-72ec-460f-b9df-ed29ff6690b9'
          const workspace = CreateWorkspaceMother.fake({ id })
          const otherWorkspaceWithSameSlug = CreateWorkspaceMother.fake({
            id: otherId,
          })

          await api.request().post('/iam/workspaces/create').send(workspace)

          return createWorkspaceCommand()
            .send(otherWorkspaceWithSameSlug)
            .expect(HttpStatus.CONFLICT)
            .expect({
              message: WorkspaceSlugAlreadyInUseError.with(workspace.slug)
                .message,
              statusCode: 409,
            })
        })
      })
    })

    describe('when id, name and slug are invalid', () => {
      it('returns 400 BAD REQUEST error', () => {
        const workspace = CreateWorkspaceMother.invalid()

        return createWorkspaceCommand()
          .send(workspace)
          .expect(HttpStatus.BAD_REQUEST)
          .expect({
            statusCode: 400,
            error: 'Bad Request',
            message: errorMessages,
          })
      })
    })

    describe('when parameters are missing', () => {
      it('returns 400 BAD REQUEST error', () => {
        const workspace = {} as CreateWorkspaceRequestDTO

        return createWorkspaceCommand()
          .send(workspace)
          .expect(HttpStatus.BAD_REQUEST)
          .expect({
            statusCode: 400,
            error: 'Bad Request',
            message: errorMessages,
          })
      })
    })
  })
})
