import { amqpServiceMock } from '@obeya/shared/infra/comms'

import { IamUsersPostController } from './iam.users.post.controller'

describe('IamController', () => {
  const ctrl = new IamUsersPostController(amqpServiceMock)
  const dto = {
    id: 'cce2fded-90cd-4ec9-8806-842834e73e6c',
    email: 'valid@email.com',
    password: 'valid_password',
  }

  describe('POST /users/signup', () => {
    it('returns status 201 Created', async () => {
      const message = `User ${dto.email} created`
      ctrl.amqp.request = jest.fn().mockResolvedValue({ message })

      const response = await ctrl.signup(dto)

      expect(response).toEqual({ message })
    })
  })
})
