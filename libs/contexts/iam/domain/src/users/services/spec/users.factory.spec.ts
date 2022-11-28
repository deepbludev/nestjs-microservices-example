import {
  InvalidEmailError,
  InvalidPasswordError,
  InvalidPropError,
} from '@obeya/shared/core'

import { fakeSignupUserDTO } from '../../__mocks__/commands/signup/signup.user.dto.fake'
import { User } from '../../model/user.aggregate'
import { UsersFactory } from '../users.factory'

describe(UsersFactory, () => {
  describe('#signup', () => {
    const factory = new UsersFactory()
    let user: User
    let isOk: boolean
    const dto = fakeSignupUserDTO()

    describe('when email and password are valid', () => {
      beforeAll(() => {
        const result = factory.create(dto)
        user = result.data
        isOk = result.isOk
      })

      it('creates a user with the correct props', () => {
        expect(isOk).toBe(true)
        expect(user.id.value).toEqual(dto.id)
        expect(user.email.value).toEqual(dto.email)

        expect(user.password.compare(dto.password)).toEqual(true)
      })
    })

    describe('when inputs are invalid', () => {
      it('fails with invalid id', () => {
        const { isOk, error } = factory.create(
          fakeSignupUserDTO({ id: 'invalid' })
        )
        expect(isOk).toBe(false)
        expect(error).toBeInstanceOf(InvalidPropError)
      })

      it('fails with invalid email', () => {
        const { isOk, error } = factory.create(
          fakeSignupUserDTO({ email: 'invalid' })
        )
        expect(isOk).toBe(false)
        expect(error).toEqual(InvalidEmailError.with('invalid'))
      })

      it('fails with invalid password', () => {
        const { isOk, error } = factory.create(
          fakeSignupUserDTO({ password: 'invalid' })
        )
        expect(isOk).toBe(false)
        expect(error).toEqual(
          InvalidPasswordError.with(
            'Password "invalid" is too short. It must be between 10 and 255 characters long.'
          )
        )
      })
    })
  })
})
