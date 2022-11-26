import { fakeCreateWorkspaceDTO } from '../../__mocks__/commands/create/create.workspace.dto.fake'
import { WorkspacesFactory } from '../../services/workspaces.factory'
import { Workspace } from '../workspace.aggregate'

describe(Workspace, () => {
  const dto = fakeCreateWorkspaceDTO()
  const { data: workspace } = WorkspacesFactory.create(dto)

  describe('#dto', () => {
    it('returns a DTO version of the workspace', () => {
      expect(workspace.dto).toEqual(dto)
    })
  })

  describe('#from', () => {
    workspace.commit()
    const workspaceFromDTO = Workspace.from(dto)

    it('returns a workspace generated from the DTO', () => {
      expect(workspaceFromDTO).toEqual(workspace)
    })
  })
})
