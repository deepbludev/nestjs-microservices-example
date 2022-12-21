import { SignupUserMother } from '../../__mocks__/commands/signup/signup.user.mother'
import { UsersFactory } from '../../services/users.factory'
import { User } from '../user.aggregate'

describe(User, () => {
  const original = SignupUserMother.fake()

  const { data: user } = UsersFactory.create(original)
  user.commit()

  const dto = {
    ...original,
    version: user.version,
    password: user.password.value,
  }

  describe('#dto', () => {
    it('returns a DTO version of the user', () => {
      expect(user.dto).toEqual(dto)
    })
  })

  describe('#from', () => {
    const userFromDTO = User.from(dto)

    it('returns a User generated from the DTO', () => {
      expect(userFromDTO).toEqual(user)
    })
  })
})
