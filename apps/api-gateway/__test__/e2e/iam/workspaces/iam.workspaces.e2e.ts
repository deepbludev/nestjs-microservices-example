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
    await dbService.db(Context.IAM).dropDatabase()
  })

  afterAll(async () => {
    await api.close()
  })

  describe('POST /iam/workspaces/create', () => {
    const expect = (
      workspace: CreateWorkspaceRequestDTO,
      httpStatusCode: HttpStatus,
      expected
    ) =>
      api
        .request()
        .post('/iam/workspaces/create')
        .send(workspace)
        .expect(httpStatusCode)
        .expect(expected)

    describe('POST', () => {
      const errorMessages = [
        'workspace id must be a valid UUID',
        'workspace name is not valid',
        'workspace slug must be in kebab-case format',
      ]

      describe('when name and slug are valid', () => {
        it('creates a valid workspace', () => {
          const workspace = fakeCreateWorkspaceDTO()

          return expect(workspace, HttpStatus.CREATED, {
            data: {
              id: workspace.id,
            },
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

            return expect(otherWorkspaceWithSameId, HttpStatus.CONFLICT, {
              message: WorkspaceIdAlreadyExistsError.with(workspace.id).message,
              statusCode: 409,
            })
          })

          it('fails with same slug', async () => {
            const id = 'cce2fded-80cd-4ec9-8806-842834e73e6j'
            const otherId = '88cc484c-eb13-4eee-afk3-9f64c36f9e99'
            const workspace = fakeCreateWorkspaceDTO({ id })
            const otherWorkspaceWithSameSlug = fakeCreateWorkspaceDTO({
              id: otherId,
              slug: workspace.slug,
            })

            await api.request().post('/iam/workspaces/create').send(workspace)

            return expect(otherWorkspaceWithSameSlug, HttpStatus.CONFLICT, {
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

          return expect(workspace, HttpStatus.BAD_REQUEST, {
            statusCode: 400,
            error: 'Bad Request',
            message: errorMessages,
          })
        })
      })

      describe('when parameters are missing', () => {
        it('returns 400 BAD REQUEST error', () => {
          const workspace = {} as CreateWorkspaceRequestDTO

          return expect(workspace, HttpStatus.BAD_REQUEST, {
            statusCode: 400,
            error: 'Bad Request',
            message: errorMessages,
          })
        })
      })
    })
  })
})
