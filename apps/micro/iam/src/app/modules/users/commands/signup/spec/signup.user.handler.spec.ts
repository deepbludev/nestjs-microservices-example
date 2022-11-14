import { CommandResponse, Result } from '@deepblu/ddd'
import { SignupUser, signupUserDTOStub } from '@obeya/contexts/iam/domain'
import { CommandBus } from '@obeya/shared/infra/comms'

import { SignupUserHandler } from '../signup.user.handler'

describe(SignupUserHandler, () => {
  const handler = new SignupUserHandler()
  const commandbus = new CommandBus([handler])

  describe('#handle', () => {
    describe('when email and password are valid', () => {
      let response: Awaited<CommandResponse>

      beforeAll(async () => {
        const dto = signupUserDTOStub()
        response = await commandbus.dispatch(SignupUser.with(dto))
      })

      it.todo('delegates validation to User factory')
      it.todo('delegates persistence to repo')

      it('returns Result.ok()', async () => {
        expect(response).toEqual(Result.ok())
      })
    })
  })
})
