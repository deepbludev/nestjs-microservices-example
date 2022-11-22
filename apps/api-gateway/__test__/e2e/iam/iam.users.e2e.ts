import { HttpStatus } from '@nestjs/common'
import {
  signupUserDTOStub,
  UserEmailAlreadyInUseError,
  UserIdAlreadyExistsError,
} from '@obeya/contexts/iam/domain'
import { UserId } from '@obeya/shared/domain'
import { Context } from '@obeya/shared/domain'
import { MongoDbService } from '@obeya/shared/infra/persistence'

import { ApiGatewayModule } from '../../../src/app/api-gateway.module'
import { TestEnvironment } from '../../utils'

describe('IAM.users (e2e)', () => {
  let api: TestEnvironment
  let dbService: MongoDbService

  beforeAll(async () => {
    api = await TestEnvironment.init(ApiGatewayModule)
    dbService = api.module.get(MongoDbService)
    await dbService.db(Context.IAM).dropDatabase()
  })

  afterEach(async () => {
    await dbService.db(Context.IAM).dropDatabase()
  })

  afterAll(async () => {
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
            statusCode: 201,
          })
        })

        describe('when user already exists', () => {
          it('fails with same User ID', async () => {
            const id = UserId.create().value
            const user = signupUserDTOStub({
              id,
              email: 'other_email@email.com',
            })

            const otherUserWithSameId = signupUserDTOStub({
              id,
              email: 'other_email@email.com',
            })

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
              'user id must be a valid UUID',
              'email is not valid',
              'password must be at least 10 characters long',
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
              'user id must be a valid UUID',
              'email is not valid',
              'password must be at least 10 characters long',
            ],
          })
        })
      })
    })
  })
})
