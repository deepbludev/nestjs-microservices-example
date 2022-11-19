import { Result } from '@deepblu/ddd'
import {
  SignupUser,
  signupUserDTOStub,
  UserEmailAlreadyInUseError,
  UserIdAlreadyExistsError,
} from '@obeya/contexts/iam/domain'
import { CommandBus } from '@obeya/shared/infra/comms'

import { SignupUserAmqpRpcController } from '../signup.user.amqp.rpc.controller'

describe(SignupUserAmqpRpcController, () => {
  const commandbus = new CommandBus([])
  const ctrl = new SignupUserAmqpRpcController(commandbus)

  describe('#signup', () => {
    describe('when email and password are valid', () => {
      commandbus.dispatch = jest.fn().mockResolvedValue(Result.ok())
      const dispatchSpy = jest.spyOn(commandbus, 'dispatch')

      it('returns status 201 Created', async () => {
        const dto = signupUserDTOStub()

        const response = await ctrl.run(dto)

        expect(dispatchSpy).toHaveBeenCalledWith(SignupUser.with(dto))
        expect(response).toEqual({
          data: { id: dto.id },
          statusCode: 201,
          message: `User ${dto.email} created`,
        })
      })
    })

    describe('when user already exists', () => {
      it('fails with same User ID', async () => {
        const dto = signupUserDTOStub()
        const error = UserIdAlreadyExistsError.with(dto.id)
        commandbus.dispatch = jest.fn().mockResolvedValue(Result.fail(error))

        const response = await ctrl.run(dto)

        expect(response).toEqual({
          data: null,
          message: error.message,
          statusCode: 409,
        })
      })

      it('fails with same User email', async () => {
        const dto = signupUserDTOStub()
        const error = UserEmailAlreadyInUseError.with(dto.email)
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
