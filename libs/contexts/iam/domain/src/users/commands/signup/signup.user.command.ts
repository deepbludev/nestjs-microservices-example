import { canonical, Command } from '@obeya/shared/domain'

import { SignupUserDTO } from './signup.user.dto'

@canonical('cmd:iam.users.signup')
export class SignupUser extends Command<SignupUserDTO> {}
