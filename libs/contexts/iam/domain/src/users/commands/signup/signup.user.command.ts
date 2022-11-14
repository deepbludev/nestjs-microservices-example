import { SignupUserDTO } from '@obeya/contexts/iam/domain'
import { canonical, Command } from '@obeya/shared/domain'

@canonical('cmd:iam.users.signup')
export class SignupUser extends Command<SignupUserDTO> {}
