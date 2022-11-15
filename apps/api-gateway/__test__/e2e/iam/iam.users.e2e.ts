import { HttpStatus } from '@nestjs/common'
import {
  signupUserDTOStub,
  UserEmailAlreadyInUseError,
  UserIdAlreadyExistsError,
} from '@obeya/contexts/iam/domain'

import { ApiGatewayModule } from '../../../src/app/api-gateway.module'
import { TestEnvironment } from '../../utils'

describe('IAM.users (e2e)', () => {
  let api: TestEnvironment

  beforeEach(async () => {
    api = await TestEnvironment.init(ApiGatewayModule)
  })

  afterEach(async () => {
    await api.clean()
    await api.close()
  })

  describe('/users/signup', () => {
    const expect = (user, httpStatusCode, expected) =>
      api
        .request()
        .post('/iam/users/signup')
        .send(user)
        .expect(httpStatusCode)
        .expect(expected)

    describe('POST', () => {
      describe('when email, id and password are valid', () => {
        afterEach(async () => {
          await api.clean()
        })
        it('creates a valid user', () => {
          const user = signupUserDTOStub()

          return expect(user, HttpStatus.CREATED, {
            data: {
              id: user.id,
            },
            message: 'User valid@email.com created',
            statusCode: 201,
          })
        })

        describe('when user already exists', () => {
          it('fails with same User ID', async () => {
            const id = 'cce2fded-90cd-4ec9-8806-842834e73e6c'
            const user = signupUserDTOStub({ id })
            const otherUserWithSameId = signupUserDTOStub({ id })

            await api.request().post('/iam/users/signup').send(user)

            return expect(otherUserWithSameId, HttpStatus.CONFLICT, {
              message: UserIdAlreadyExistsError.with(id).message,
              statusCode: 409,
            })
          })

          it('fails with same user email', async () => {
            const id = 'cce2fded-90cd-4ec9-8806-842834e73e6c'
            const otherId = '88cc384c-eb13-4eee-af43-9f64c36f9e99'
            const user = signupUserDTOStub({ id })
            const otherUserWithSameEmail = signupUserDTOStub({
              id: otherId,
              email: user.email,
            })

            await api.request().post('/iam/users/signup').send(user)

            return expect(otherUserWithSameEmail, HttpStatus.CONFLICT, {
              message: UserEmailAlreadyInUseError.with(user.email).message,
              statusCode: 409,
            })
          })
        })
      })

      describe('when id, email and password are invalid', () => {
        it('returns 400 BAD REQUEST error', () => {
          const user = signupUserDTOStub({
            id: 'invalid',
            email: 'invalid',
            password: 'invalid',
          })

          return expect(user, HttpStatus.BAD_REQUEST, {
            statusCode: 400,
            error: 'Bad Request',
            message: [
              'id must be a UUID',
              'email must be an email',
              'password must be longer than or equal to 10 characters',
            ],
          })
        })
      })

      describe('when parameters are missing', () => {
        it('returns 400 BAD REQUEST error', () => {
          const user = {}

          return expect(user, HttpStatus.BAD_REQUEST, {
            statusCode: 400,
            error: 'Bad Request',
            message: [
              'id must be a UUID',
              'email must be an email',
              'password must be shorter than or equal to 255 characters',
              'password must be longer than or equal to 10 characters',
              'password must be a string',
            ],
          })
        })
      })
    })
  })
})
