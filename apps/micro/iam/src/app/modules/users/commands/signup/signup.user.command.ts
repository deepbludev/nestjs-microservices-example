import { Command } from '@deepblu/ddd'
import { SignupUserDTO } from '@obeya/contexts/iam/domain'

export class SignupUser extends Command<SignupUserDTO> {}
