import { UserSignedUp } from '@obeya/contexts/iam/domain'
import { eventSubscriber, IEventSubscriber } from '@obeya/shared/core'

@eventSubscriber(UserSignedUp)
export class UserSignedUpSubscriber extends IEventSubscriber {
  async on(event: UserSignedUp): Promise<void> {
    console.log({ event })
  }
}
