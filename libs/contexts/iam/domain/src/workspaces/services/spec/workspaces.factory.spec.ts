import {
  InvalidPropError,
  InvalidSlugError,
  InvalidStringError,
} from '@obeya/shared/core'

import { CreateWorkspaceMother } from '../../__mocks__/commands/create/create.workspace.mother'
import { Workspace } from '../../model/workspace.aggregate'
import { WorkspacesFactory } from '../workspaces.factory'

describe(WorkspacesFactory, () => {
  describe('#create', () => {
    const factory = new WorkspacesFactory()
    let workspace: Workspace
    let isOk: boolean
    const dto = CreateWorkspaceMother.fake()

    describe('when name and slug are valid', () => {
      beforeAll(() => {
        const result = factory.create(dto)
        workspace = result.data
        isOk = result.isOk
      })

      it('creates a workspace with the correct props', () => {
        expect(isOk).toBe(true)
        expect(workspace.id.value).toEqual(dto.id)
        expect(workspace.name.value).toEqual(dto.name)
        expect(workspace.slug.value).toEqual(dto.slug)
      })
    })

    describe('when inputs are invalid', () => {
      it('fails with invalid id', () => {
        const { isOk, error } = factory.create(
          CreateWorkspaceMother.fake({ id: 'invalid' })
        )
        expect(isOk).toBe(false)
        expect(error).toBeInstanceOf(InvalidPropError)
      })

      it('fails with invalid name', () => {
        const { isOk, error } = factory.create(
          CreateWorkspaceMother.fake({ name: '' })
        )
        expect(isOk).toBe(false)
        expect(error).toBeInstanceOf(InvalidStringError)
      })

      it('fails with invalid slug', () => {
        const { isOk, error } = factory.create(
          CreateWorkspaceMother.fake({ slug: 'invalid_Slug' })
        )
        expect(isOk).toBe(false)
        expect(error.message).toEqual(new InvalidSlugError().message)
      })
    })
  })
})
