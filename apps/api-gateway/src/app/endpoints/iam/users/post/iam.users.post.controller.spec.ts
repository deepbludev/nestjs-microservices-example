import {
  SignupUser,
  UserEmailAlreadyInUseError,
  UserIdAlreadyExistsError,
} from '@obeya/contexts/iam/domain'
import { amqpServiceMock, Exchange, RPC } from '@obeya/shared/infra/comms'

import { IamUsersPostController } from './iam.users.post.controller'

describe(IamUsersPostController, () => {
  const ctrl = new IamUsersPostController(amqpServiceMock)
  const dto = {
    id: 'cce2fded-90cd-4ec9-8806-842834e73e6c',
    email: 'valid@email.com',
    password: 'valid_password',
  }

  describe('POST /users/signup', () => {
    describe('when email and password are valid', () => {
      it('returns status 201 Created', async () => {
        const expected = 'foo'
        ctrl.amqp.request = jest.fn().mockResolvedValue(expected)
        const requestSpy = jest.spyOn(ctrl.amqp, 'request')

        const response = await ctrl.signup(dto)

        expect(response).toEqual(expected)
        expect(requestSpy).toHaveBeenCalledWith({
          exchange: Exchange.IAM,
          routingKey: SignupUser.canonical,
          payload: dto,
          timeout: RPC.timeout,
        })
      })
    })

    describe('when user already exists', () => {
      it('fails with same User ID', async () => {
        const error = UserIdAlreadyExistsError.with(dto.id)

        ctrl.amqp.request = jest.fn().mockResolvedValue({
          message: error.toString(),
          statusCode: 409,
        })

        await expect(() => ctrl.signup(dto)).rejects.toThrow(error)
      })

      it('fails with same User email', async () => {
        const error = UserEmailAlreadyInUseError.with(dto.email)

        ctrl.amqp.request = jest.fn().mockResolvedValue({
          message: error.toString(),
          statusCode: 409,
        })

        await expect(() => ctrl.signup(dto)).rejects.toThrow(error)
      })
    })
  })
})
