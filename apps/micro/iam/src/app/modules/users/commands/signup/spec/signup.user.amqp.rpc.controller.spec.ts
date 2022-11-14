import { Result } from '@deepblu/ddd'
import { SignupUser, signupUserDTOStub } from '@obeya/contexts/iam/domain'
import { CommandBus } from '@obeya/shared/infra/comms'

import { SignupUserAmqpRpcController } from '../signup.user.amqp.rpc.controller'

describe(SignupUserAmqpRpcController, () => {
  const commandbus = new CommandBus([])
  const ctrl = new SignupUserAmqpRpcController(commandbus)

  commandbus.dispatch = jest.fn().mockResolvedValue(Result.ok())
  const dispatchSpy = jest.spyOn(commandbus, 'dispatch')

  describe('#signup', () => {
    describe('when email and password are valid', () => {
      it('returns status 201 Created', async () => {
        const dto = signupUserDTOStub()

        const response = await ctrl.run(dto)

        expect(dispatchSpy).toHaveBeenCalledWith(SignupUser.with(dto))
        expect(response).toEqual({
          data: { id: dto.id },
          status: 201,
          message: `User ${dto.email} created`,
        })
      })
    })
  })
})
