import { SignupUserDTO } from '@obeya/contexts/iam/domain'
import { canonical, CanonicalCommand } from '@obeya/shared/domain'

@canonical('cmd:iam.users.signup')
export class SignupUser extends CanonicalCommand<SignupUserDTO> {}
