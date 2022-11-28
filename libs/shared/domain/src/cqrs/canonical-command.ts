import { Command as BaseCommand, IPayload, textUtils } from '@obeya/shared/core'

export type CanonicalCommand = `cmd:${string}`

export class Command<P extends IPayload = IPayload> extends BaseCommand<P> {
  static readonly canonical: CanonicalCommand = `cmd:${textUtils
    .camelToSnake(this.name)
    .replace('_', '-')}`

  static path(): string {
    return `/${this.canonical.split(':')[1].replaceAll('.', '/')}`
  }

  get canonical(): CanonicalCommand {
    return (this.constructor as typeof Command).canonical
  }

  get path(): string {
    return (this.constructor as typeof Command).path()
  }
}
