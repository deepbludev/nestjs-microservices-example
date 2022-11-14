import { eventSubscriber, IEventSubscriber } from '@deepblu/ddd'
import { UserSignedUp } from '@obeya/contexts/iam/domain'

@eventSubscriber(UserSignedUp)
export class UserSignedUpSubscriber extends IEventSubscriber {
  async on(event: UserSignedUp): Promise<void> {
    console.log({ event })
  }
}
