import { HttpStatus } from '@nestjs/common'
import { signupUserDTOStub } from '@obeya/contexts/iam/domain'

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

  describe('/users', () => {
    describe('POST', () => {
      it('creates a valid user', () => {
        const body = signupUserDTOStub()

        return api
          .request()
          .post('/iam/users/signup')
          .send(body)
          .expect(HttpStatus.CREATED)
          .expect({
            data: {
              id: body.id,
            },
            message: 'User valid@email.com created',
            status: 201,
          })
      })
    })
  })
})
