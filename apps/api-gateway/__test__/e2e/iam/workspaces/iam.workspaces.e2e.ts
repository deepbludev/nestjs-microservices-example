import { HttpStatus } from '@nestjs/common'
import {
  CreateWorkspaceRequestDTO,
  fakeCreateWorkspaceDTO,
  WorkspaceIdAlreadyExistsError,
  WorkspaceSlugAlreadyInUseError,
} from '@obeya/contexts/iam/domain'
import { Context } from '@obeya/shared/domain'
import { MongoDbService } from '@obeya/shared/infra/persistence'

import { ApiGatewayModule } from '../../../../src/app/api-gateway.module'
import { TestEnvironment } from '../../../utils'

describe('IAM Workspaces Commands (e2e)', () => {
  let api: TestEnvironment
  let dbService: MongoDbService

  beforeAll(async () => {
    api = await TestEnvironment.init(ApiGatewayModule)
    dbService = api.module.get(MongoDbService)
    await dbService.db(Context.IAM).dropDatabase()
  })

  afterEach(async () => {
    await dbService.collection('Workspace', Context.IAM).deleteMany({})
  })

  afterAll(async () => {
    await api.close()
  })

  describe('POST /iam/workspaces/create', () => {
    const req = () => api.request().post('/iam/workspaces/create')

    describe('POST', () => {
      const errorMessages = [
        'workspace id must be a valid UUID',
        'workspace name is not valid',
        'slug must be alphanumeric kebab-case of less than 64 characthers',
      ]

      describe('when name and slug are valid', () => {
        it('creates a valid workspace', () => {
          const workspace = fakeCreateWorkspaceDTO()

          return req()
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
            const workspace = fakeCreateWorkspaceDTO()
            const otherWorkspaceWithSameId = fakeCreateWorkspaceDTO({
              slug: 'other-workspace',
            })

            await api.request().post('/iam/workspaces/create').send(workspace)

            return req()
              .send(otherWorkspaceWithSameId)
              .expect(HttpStatus.CONFLICT)
              .expect({
                message: WorkspaceIdAlreadyExistsError.with(workspace.id)
                  .message,
                statusCode: 409,
              })
          })

          it('fails with same slug', async () => {
            const id = '12e8a297-59f6-4614-b5ec-13b45249531f'
            const otherId = '4e6beba7-72ec-460f-b9df-ed29ff6690b9'
            const workspace = fakeCreateWorkspaceDTO({ id })
            const otherWorkspaceWithSameSlug = fakeCreateWorkspaceDTO({
              id: otherId,
            })

            await api.request().post('/iam/workspaces/create').send(workspace)

            return req()
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
          const workspace = fakeCreateWorkspaceDTO({
            id: 'invalid',
            name: '',
            slug: 'invalid Slug',
          })

          return req().send(workspace).expect(HttpStatus.BAD_REQUEST).expect({
            statusCode: 400,
            error: 'Bad Request',
            message: errorMessages,
          })
        })
      })

      describe('when parameters are missing', () => {
        it('returns 400 BAD REQUEST error', () => {
          const workspace = {} as CreateWorkspaceRequestDTO

          return req().send(workspace).expect(HttpStatus.BAD_REQUEST).expect({
            statusCode: 400,
            error: 'Bad Request',
            message: errorMessages,
          })
        })
      })
    })
  })
})
