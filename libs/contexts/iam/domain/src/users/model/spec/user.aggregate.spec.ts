import { signupUserDTOStub } from '../../__mocks__/commands/signup/signup.user.dto.mock'
import { UsersFactory } from '../../services/users.factory'
import { User } from '../user.aggregate'

describe(User, () => {
  const original = signupUserDTOStub()
  const { data: user } = UsersFactory.create(original)
  const dto = { ...original, password: user.password.value }

  describe('#dto', () => {
    it('returns a DTO version of the user', () => {
      expect(user.dto).toEqual(dto)
    })
  })

  describe('#from', () => {
    user.commit()
    const userFromDTO = User.from(dto)

    it('returns a User generated from the DTO', () => {
      expect(userFromDTO).toEqual(user)
    })
  })
})
