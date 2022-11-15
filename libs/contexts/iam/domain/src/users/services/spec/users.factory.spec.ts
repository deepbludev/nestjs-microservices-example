import { signupUserDTOStub } from '../../__mocks__/commands/signup/signup.user.dto.mock'
import { User } from '../../model/user.aggregate'
import { UsersFactory } from '../users.factory'

describe(UsersFactory, () => {
  describe('#signup', () => {
    const factory = new UsersFactory()
    let user: User
    let isOk: boolean
    const dto = signupUserDTOStub()

    describe('when email and password are valid', () => {
      beforeAll(async () => {
        const result = await factory.signup(dto)
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

    // describe('when user already exists', () => {
    //   it('fails with same User ID', async () => {
    //     repo.exists = jest.fn().mockReturnValue(true)

    //     const { isFail, error } = await factory.signup(dto)

    //     expect(isFail).toBe(true)
    //     expect(error).toEqual(UserIdAlreadyExistsError.with(dto.id))
    //   })

    //   it('fails with same User email', async () => {
    //     repo.findByEmail = jest.fn().mockReturnValue(user)

    //     const { isFail, error } = await factory.signup(dto)

    //     expect(isFail).toBe(true)
    //     expect(error).toEqual(UserEmailAlreadyInUseError.with(dto.email))
    //   })
    // })
  })
})
