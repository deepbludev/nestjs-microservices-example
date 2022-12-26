import {
  SignupUserMother,
  UserEmailAlreadyInUseError,
  UserIdAlreadyExistsError,
  UsersFactory,
  UsersRepoMock,
} from '@obeya/contexts/iam/domain'
import { CommandResponse, Result } from '@obeya/shared/core'
import { UserId } from '@obeya/shared/domain'
import { CommandBus } from '@obeya/shared/infra/comms'

import { SignupUser } from './signup.user.command'
import { SignupUserHandler } from './signup.user.handler'

describe(SignupUserHandler, () => {
  const eventbus = {
    publish: jest.fn(),
    register: jest.fn(),
  }
  const repo = new UsersRepoMock(eventbus)
  const factory = new UsersFactory()
  const handler = new SignupUserHandler(repo, factory)
  const commandbus = new CommandBus([handler])

  describe('#handle', () => {
    const { id, email, password } = SignupUserMother.fake()
    const command: SignupUser = SignupUser.with({ id, email, password })

    describe('when email and password are valid', () => {
      let response: Awaited<CommandResponse>
      let createSpy: jest.SpyInstance

      beforeAll(async () => {
        response = await commandbus.dispatch(command)
        createSpy = jest.spyOn(factory, 'create')

        await handler.handle(command)
      })

      it('should call UsersFactory with the correct params', () => {
        expect(createSpy).toHaveBeenCalledWith({ id, email, password })
      })

      it('delegates persistence to repo', async () => {
        const user = await repo.get(UserId.from(id).data)

        expect(user?.id.value).toEqual(id)
        expect(user?.email.value).toEqual(email)
        expect(user?.password.compare(password)).toBe(true)
      })

      it('returns Result.ok()', async () => {
        expect(response).toEqual(Result.ok())
      })
    })

    describe('when user already exists', () => {
      it('fails with same User ID', async () => {
        repo.exists = jest.fn().mockReturnValue(true)

        const result = await handler.handle(command)

        const expected = Result.fail(UserIdAlreadyExistsError.with(id))
        expect(result).toEqual(expected)
      })

      it('fails with same User email', async () => {
        const dto = SignupUserMother.fake({
          id: '9e48f43e-fd9b-4c31-9d39-7e17509bbfbb',
          email: 'other@email.com',
        })

        const user = factory.create(dto).data
        repo.exists = jest.fn().mockReturnValue(false)
        repo.findByEmail = jest.fn().mockReturnValue(user)

        const result = await handler.handle(SignupUser.with(dto))

        const expected = Result.fail(UserEmailAlreadyInUseError.with(dto.email))
        expect(result).toEqual(expected)
      })
    })
  })
})
