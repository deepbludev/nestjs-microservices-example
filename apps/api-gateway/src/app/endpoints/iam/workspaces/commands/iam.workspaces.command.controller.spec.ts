import {
  CreateWorkspace,
  CreateWorkspaceRequestDTO,
  CreateWorkspaceResponseDTO,
  fakeCreateWorkspaceDTO,
  WorkspaceIdAlreadyExistsError,
  WorkspaceSlugAlreadyInUseError,
} from '@obeya/contexts/iam/domain'
import { Context } from '@obeya/shared/domain'
import { amqpServiceMock, RPC } from '@obeya/shared/infra/comms'
import { HttpResponse, HttpStatusCode } from '@obeya/shared/infra/http'

import { IamWorkspacesCommandsController } from './iam.workspaces.command.controller'

describe(IamWorkspacesCommandsController, () => {
  const ctrl = new IamWorkspacesCommandsController(amqpServiceMock)
  const dto: CreateWorkspaceRequestDTO = fakeCreateWorkspaceDTO()

  describe('POST /workspaces', () => {
    describe('when email and password are valid', () => {
      it('returns status 201 Created', async () => {
        const expected: HttpResponse<CreateWorkspaceResponseDTO> = {
          data: { id: dto.id },
          message: 'foo',
          statusCode: HttpStatusCode.CREATED,
        }
        ctrl.amqp.request = jest.fn().mockResolvedValue(expected)
        const requestSpy = jest.spyOn(ctrl.amqp, 'request')

        const response = await ctrl.create(dto)

        expect(response).toEqual(expected)
        expect(requestSpy).toHaveBeenCalledWith({
          exchange: Context.IAM,
          routingKey: CreateWorkspace.canonical,
          payload: dto,
          timeout: RPC.timeout,
        })
      })
    })

    describe('when workspace already exists', () => {
      it('fails with same Workspace ID', async () => {
        const error = WorkspaceIdAlreadyExistsError.with(dto.id)

        ctrl.amqp.request = jest.fn().mockResolvedValue({
          data: null,
          message: error.message,
          statusCode: HttpStatusCode.CONFLICT,
        })

        await expect(() => ctrl.create(dto)).rejects.toThrow(error)
      })

      it('fails with same slug', async () => {
        const error = WorkspaceSlugAlreadyInUseError.with(dto.slug)

        ctrl.amqp.request = jest.fn().mockResolvedValue({
          data: null,
          message: error.message,
          statusCode: HttpStatusCode.CONFLICT,
        })

        await expect(() => ctrl.create(dto)).rejects.toThrow(error)
      })
    })
  })
})
