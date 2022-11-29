import { HttpStatus } from '@nestjs/common'
import {
  SignupUserMother,
  SignupUserRequestDTO,
  UserEmailAlreadyInUseError,
  UserIdAlreadyExistsError,
} from '@obeya/contexts/iam/domain'
import { Context } from '@obeya/shared/domain'
import { MongoDbService } from '@obeya/shared/infra/persistence'

import { ApiGatewayModule } from '../../../../../../src/app/api-gateway.module'
import { TestEnvironment } from '../../../../../utils'

describe('IAM/Users SignupUser Command (e2e)', () => {
  let api: TestEnvironment
  let dbService: MongoDbService

  beforeAll(async () => {
    api = await TestEnvironment.init(ApiGatewayModule)
    dbService = api.module.get(MongoDbService)
    await dbService.collection('User', Context.IAM).deleteMany({})
  })

  afterEach(async () => {
    await dbService.collection('User', Context.IAM).deleteMany({})
  })

  afterAll(async () => {
    await api.close()
  })

  describe('POST /iam/users/signup', () => {
    const errorMessages = [
      'user id must be a valid UUID',
      'email is not valid',
      'password must be at least 10 characters long',
    ]

    const req = () => api.request().post('/iam/users/signup')

    describe('when email, id and password are valid', () => {
      it('creates a valid user', () => {
        const user = SignupUserMother.fake()

        return req()
          .send(user)
          .expect(HttpStatus.CREATED)
          .expect({
            data: { id: user.id },
            message: 'User valid@email.com created',
            statusCode: 201,
          })
      })

      describe('when user already exists', () => {
        it('fails with same User ID', async () => {
          const user = SignupUserMother.fake()
          const otherUserWithSameId = SignupUserMother.fake({
            email: 'other_email@email.com',
          })

          await api.request().post('/iam/users/signup').send(user)

          return req()
            .send(otherUserWithSameId)
            .expect(HttpStatus.CONFLICT)
            .expect({
              message: UserIdAlreadyExistsError.with(user.id).message,
              statusCode: 409,
            })
        })

        it('fails with same user email', async () => {
          const id = 'cce2fded-90cd-4ec9-8806-842834e73e6c'
          const otherId = '88cc384c-eb13-4eee-af43-9f64c36f9e99'
          const user = SignupUserMother.fake({ id })
          const otherUserWithSameEmail = SignupUserMother.fake({
            id: otherId,
            email: user.email,
          })

          await api.request().post('/iam/users/signup').send(user)

          return req()
            .send(otherUserWithSameEmail)
            .expect(HttpStatus.CONFLICT)
            .expect({
              message: UserEmailAlreadyInUseError.with(user.email).message,
              statusCode: 409,
            })
        })
      })
    })

    describe('when id, email and password are invalid', () => {
      it('returns 400 BAD REQUEST error', () => {
        const user = SignupUserMother.invalid()

        return req().send(user).expect(HttpStatus.BAD_REQUEST).expect({
          statusCode: 400,
          error: 'Bad Request',
          message: errorMessages,
        })
      })
    })

    describe('when parameters are missing', () => {
      it('returns 400 BAD REQUEST error', () => {
        const user = {} as SignupUserRequestDTO

        return req().send(user).expect(HttpStatus.BAD_REQUEST).expect({
          statusCode: 400,
          error: 'Bad Request',
          message: errorMessages,
        })
      })
    })
  })
})
