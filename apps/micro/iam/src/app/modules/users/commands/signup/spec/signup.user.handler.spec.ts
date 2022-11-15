import { CommandResponse, Result } from '@deepblu/ddd'
import {
  SignupUser,
  signupUserDTOStub,
  User,
  UserEmailAlreadyInUseError,
  UserIdAlreadyExistsError,
  UsersFactory,
  UsersRepoMock,
} from '@obeya/contexts/iam/domain'
import { UserId } from '@obeya/shared/domain'
import { CommandBus } from '@obeya/shared/infra/comms'

import { SignupUserHandler } from '../signup.user.handler'

const eventbus = {
  publish: jest.fn(),
  register: jest.fn(),
}

describe(SignupUserHandler, () => {
  const repo = new UsersRepoMock(eventbus)
  const handler = new SignupUserHandler(repo)
  const commandbus = new CommandBus([handler])

  describe('#handle', () => {
    describe('when email and password are valid', () => {
      const { id, email, password } = signupUserDTOStub()
      const command: SignupUser = SignupUser.with({ id, email, password })
      let user: User

      let response: Awaited<CommandResponse>
      let saveSpy: jest.SpyInstance
      let createSpy: jest.SpyInstance

      beforeAll(async () => {
        response = await commandbus.dispatch(command)
        saveSpy = jest.spyOn(repo, 'save')
        createSpy = jest.spyOn(UsersFactory, 'signup')
        await handler.handle(command)

        user = await repo.get(UserId.from(id).data)
      })

      it('should call User.create with the correct params', () => {
        expect(createSpy).toHaveBeenCalledWith({ id, email, password })
      })

      it('delegates persistence to repo', async () => {
        expect(saveSpy).toHaveBeenCalledWith(user)
      })

      it('returns Result.ok()', async () => {
        expect(response).toEqual(Result.ok())
      })
    })

    describe('when user already exists', () => {
      const { id, email, password } = signupUserDTOStub()
      const command: SignupUser = SignupUser.with({ id, email, password })

      beforeAll(async () => {
        const { data: user } = await UsersFactory.signup({
          id,
          email,
          password,
        })
        await repo.save(user)
      })

      it('fails with same User ID', async () => {
        const expected = Result.fail(UserIdAlreadyExistsError.with(id))
        UsersFactory.signup = jest.fn().mockReturnValue(expected)

        const result = await handler.handle(command)

        expect(result).toEqual(expected)
      })

      it('fails with same User email', async () => {
        const expected = Result.fail(UserEmailAlreadyInUseError.with(email))
        UsersFactory.signup = jest.fn().mockReturnValue(expected)

        const result = await handler.handle(
          SignupUser.with({
            id: '9e48f43e-fd9b-4c31-9d39-7e17509bbfbb',
            email,
            password,
          })
        )

        expect(result).toEqual(expected)
      })
    })
  })
})
