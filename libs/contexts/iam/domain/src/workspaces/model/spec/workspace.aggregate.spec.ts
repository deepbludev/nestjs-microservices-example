import { CreateWorkspaceMother } from '../../__mocks__/commands/create/create.workspace.mother'
import { WorkspacesFactory } from '../../services/workspaces.factory'
import { Workspace } from '../workspace.aggregate'

describe(Workspace, () => {
  const original = CreateWorkspaceMother.fake()

  const { data: workspace } = WorkspacesFactory.create(original)
  workspace.commit()

  const dto = { ...original, version: workspace.version }

  describe('#dto', () => {
    it('returns a DTO version of the workspace', () => {
      expect(workspace.dto).toEqual(dto)
    })
  })

  describe('#from', () => {
    const workspaceFromDTO = Workspace.from(dto)
    it('returns a workspace generated from the DTO', () => {
      expect(workspaceFromDTO).toEqual(workspace)
    })
  })
})
