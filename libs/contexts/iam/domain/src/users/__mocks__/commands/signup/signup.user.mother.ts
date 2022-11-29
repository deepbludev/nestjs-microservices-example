import { MotherCreator } from '@obeya/shared/core'
import { UserId } from '@obeya/shared/domain'

import { SignupUserRequestDTO } from '../../../commands/signup/signup.user.dto'

export class SignupUserMother {
  static fake(dto?: Partial<SignupUserRequestDTO>): SignupUserRequestDTO {
    return {
      id: dto?.id ?? 'cce2fded-90cd-4ec9-8806-842834e73e6c',
      email: dto?.email ?? 'valid@email.com',
      password: dto?.password ?? 'valid_password',
    }
  }

  static random(): SignupUserRequestDTO {
    return this.fake({
      id: UserId.create().value,
      email: MotherCreator.faker().internet.email(),
      password: MotherCreator.faker().internet.password(),
    })
  }

  static invalid(dto?: Partial<SignupUserRequestDTO>): SignupUserRequestDTO {
    return {
      id: dto?.id ?? 'invalid',
      email: dto?.email ?? 'invalid',
      password: dto?.password ?? 'invalid',
    }
  }
}
