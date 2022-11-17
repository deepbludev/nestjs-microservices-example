import { HttpStatus } from '@nestjs/common'

import { ApiGatewayModule } from '../../../src/app/api-gateway.module'
import { TestEnvironment } from '../../utils/test-environment.util'

describe('API Gateway Status (e2e)', () => {
  let api: TestEnvironment

  beforeEach(async () => {
    api = await TestEnvironment.init(ApiGatewayModule)
  })

  afterEach(async () => {
    await api.close()
  })

  describe('/status', () => {
    describe('GET', () => {
      it('returns http status 200 OK', () => {
        return api.request().get('/status').expect(HttpStatus.OK).expect({
          message: '[API] All systems operational',
        })
      })
    })
  })
})
