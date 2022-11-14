import { Command, IPayload, textUtils } from '@deepblu/ddd'

export class CanonicalCommand<
  P extends IPayload = IPayload
> extends Command<P> {
  static readonly canonical = 'cmd:' + textUtils.camelToSnake(this.name)

  get canonical(): string {
    return (this.constructor as typeof CanonicalCommand).canonical
  }
}
