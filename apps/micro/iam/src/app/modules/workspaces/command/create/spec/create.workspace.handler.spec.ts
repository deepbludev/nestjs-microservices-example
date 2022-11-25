import { CommandResponse, Result } from '@deepblu/ddd'
import {
  CreateWorkspace,
  fakeCreateWorkspaceDTO,
  WorkspaceIdAlreadyExistsError,
  WorkspacesFactory,
  WorkspaceSlugAlreadyInUseError,
  WorkspacesRepoMock,
} from '@obeya/contexts/iam/domain'
import { WorkspaceId } from '@obeya/shared/domain'
import { CommandBus } from '@obeya/shared/infra/comms'

import { CreateWorkspaceHandler } from '../create.workspace.handler'

describe(CreateWorkspaceHandler, () => {
  const eventbus = {
    publish: jest.fn(),
    register: jest.fn(),
  }
  const repo = new WorkspacesRepoMock(eventbus)
  const factory = new WorkspacesFactory()
  const handler = new CreateWorkspaceHandler(repo, factory)
  const commandbus = new CommandBus([handler])

  describe('#handle', () => {
    const { id, name, slug } = fakeCreateWorkspaceDTO()
    const command: CreateWorkspace = CreateWorkspace.with({ id, name, slug })

    describe('when name and slug are valid', () => {
      let response: Awaited<CommandResponse>
      let createSpy: jest.SpyInstance

      beforeAll(async () => {
        response = await commandbus.dispatch(command)
        createSpy = jest.spyOn(factory, 'create')

        await handler.handle(command)
      })

      it('should call WorkspacesFactory with the correct params', () => {
        expect(createSpy).toHaveBeenCalledWith({ id, name, slug })
      })

      it('delegates persistence to repo', async () => {
        const workspace = await repo.get(WorkspaceId.from(id).data)

        expect(workspace.id.value).toEqual(id)
        expect(workspace.name.value).toEqual(name)
        expect(workspace.slug.value).toEqual(slug)
      })

      it('returns Result.ok()', async () => {
        expect(response).toEqual(Result.ok())
      })
    })

    describe('when user already exists', () => {
      it('fails with same User ID', async () => {
        repo.exists = jest.fn().mockReturnValue(true)

        const result = await handler.handle(command)

        const expected = Result.fail(WorkspaceIdAlreadyExistsError.with(id))
        expect(result).toEqual(expected)
      })

      it('fails with same slug', async () => {
        const dto = fakeCreateWorkspaceDTO({
          id: '9e48f43e-fd9b-4c31-9d39-7e17509bbfbb',
          slug: 'other-workspace-slug',
        })

        const user = factory.create(dto).data
        repo.exists = jest.fn().mockReturnValue(false)
        repo.findBySlug = jest.fn().mockReturnValue(user)

        const result = await handler.handle(CreateWorkspace.with(dto))

        const expected = Result.fail(
          WorkspaceSlugAlreadyInUseError.with(dto.slug)
        )
        expect(result).toEqual(expected)
      })
    })
  })
})
