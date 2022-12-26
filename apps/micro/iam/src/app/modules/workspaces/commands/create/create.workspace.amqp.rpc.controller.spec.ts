import { CreateWorkspace } from '@obeya/contexts/iam/application'
import { CreateWorkspaceMother } from '@obeya/contexts/iam/domain'
import {
  WorkspaceIdAlreadyExistsError,
  WorkspaceSlugAlreadyInUseError,
} from '@obeya/contexts/iam/domain'
import { Result } from '@obeya/shared/core'
import { CommandBus } from '@obeya/shared/infra/comms'

import { CreateWorkspaceAmqpRpcController } from './create.workspace.amqp.rpc.controller'

describe(CreateWorkspaceAmqpRpcController, () => {
  const commandbus = new CommandBus([])
  const ctrl = new CreateWorkspaceAmqpRpcController(commandbus)

  describe('#signup', () => {
    describe('when name and slug are valid', () => {
      commandbus.dispatch = jest.fn().mockResolvedValue(Result.ok())
      const dispatchSpy = jest.spyOn(commandbus, 'dispatch')

      it('returns status 201 Created', async () => {
        const dto = CreateWorkspaceMother.fake()

        const response = await ctrl.run(dto)

        expect(dispatchSpy).toHaveBeenCalledWith(CreateWorkspace.with(dto))
        expect(response).toEqual({
          data: { id: dto.id },
          statusCode: 201,
          message: `Workspace ${dto.name} (${dto.slug}) created`,
        })
      })
    })

    describe('when workspace already exists', () => {
      it('fails with same Workspace ID', async () => {
        const dto = CreateWorkspaceMother.fake()
        const error = WorkspaceIdAlreadyExistsError.with(dto.id)
        commandbus.dispatch = jest.fn().mockResolvedValue(Result.fail(error))

        const response = await ctrl.run(dto)

        expect(response).toEqual({
          data: null,
          message: error.message,
          statusCode: 409,
        })
      })

      it('fails with same slug', async () => {
        const dto = CreateWorkspaceMother.fake()
        const error = WorkspaceSlugAlreadyInUseError.with(dto.slug)
        commandbus.dispatch = jest.fn().mockResolvedValue(Result.fail(error))

        const response = await ctrl.run(dto)

        expect(response).toEqual({
          data: null,
          message: error.message,
          statusCode: 409,
        })
      })
    })
  })
})
