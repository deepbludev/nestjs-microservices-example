import { HttpStatus } from '@nestjs/common'

import { ApiGatewayModule } from '../../../src/app/api-gateway.module'
import { TestEnvironment } from '../../utils/test-environment.util'

describe('IAM (e2e)', () => {
  let api: TestEnvironment

  beforeEach(async () => {
    api = await TestEnvironment.init(ApiGatewayModule)
  })

  afterEach(async () => {
    await api.close()
  })

  describe('/iam', () => {
    describe('/status', () => {
      describe('GET', () => {
        it('returns http status 200 OK', () => {
          return api.request().get('/iam/status').expect(HttpStatus.OK)
        })
      })
    })

    // describe('/users', () => {
    //   describe('POST', () => {
    //     it('creates a valid user', () => {
    //       const body = {
    //         id: 'cce2fded-90cd-4ec9-8806-842834e73e6c',
    //         email: 'valid@email.com',
    //         password: 'valid_password',
    //       }

    //       return api
    //         .request()
    //         .post('/iam/users/signup')
    //         .send(body)
    //         .expect(HttpStatus.CREATED)
    //         .expect({
    //           statusCode: HttpStatus.CREATED,
    //           message: `User ${body.email} created`,
    //         })
    //     })
    //   })
    // })
  })
})
