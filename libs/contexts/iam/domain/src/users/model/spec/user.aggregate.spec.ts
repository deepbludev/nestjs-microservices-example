import { signupUserDTOStub } from '../../__mocks__/commands/signup/signup.user.dto.mock'
import { UsersFactory } from '../../services/users.factory'
import { User } from '../user.aggregate'

describe(User, () => {
  describe('#signup', () => {
    describe('when email and password are valid', () => {
      const dto = signupUserDTOStub()
      const { data: user, isOk } = UsersFactory.signup(dto)

      it('creates a user with the correct props', () => {
        expect(isOk).toBe(true)
        expect(user.id.value).toEqual(dto.id)
        expect(user.email.value).toEqual(dto.email)

        expect(user.password.compare(dto.password)).toEqual(true)
      })
    })
  })
})
