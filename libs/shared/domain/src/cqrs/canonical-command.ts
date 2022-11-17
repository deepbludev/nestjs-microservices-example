import { Command as BaseCommand, IPayload, textUtils } from '@deepblu/ddd'

export class Command<P extends IPayload = IPayload> extends BaseCommand<P> {
  static readonly canonical = 'cmd:' + textUtils.camelToSnake(this.name)

  get canonical(): string {
    return (this.constructor as typeof Command).canonical
  }
}
