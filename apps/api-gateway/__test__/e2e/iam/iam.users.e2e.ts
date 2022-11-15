import { HttpStatus } from '@nestjs/common'
import { signupUserDTOStub } from '@obeya/contexts/iam/domain'

import { ApiGatewayModule } from '../../../src/app/api-gateway.module'
import { TestEnvironment } from '../../utils'

describe('IAM.users (e2e)', () => {
  let api: TestEnvironment

  beforeEach(async () => {
    api = await TestEnvironment.init(ApiGatewayModule)
  })

  afterEach(async () => {
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
        it('creates a valid user', () => {
          const user = signupUserDTOStub()

          return expect(user, HttpStatus.CREATED, {
            data: {
              id: user.id,
            },
            message: 'User valid@email.com created',
            status: 201,
          })
        })

        describe('when user already exists', () => {
          it('returns http status 409 Conflict', () => {
            const user = signupUserDTOStub()

            api.request().post('/iam/users/signup').send(user)

            return expect(user, HttpStatus.CONFLICT, {
              data: null,
              message: 'User already exists',
              status: 409,
            })
          })
        })
      })

      describe('when id, email and password are invalid', () => {
        it('returns an error', () => {
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
    })
  })
})
