import { Result } from '../core/result'
import { Constructor } from '../types'
import { ICommand } from './command.abstract'

export type CommandResponse<R = void, E extends Error = Error> = Promise<
  Result<R, E>
>

export abstract class ICommandHandler<C extends ICommand = ICommand> {
  static readonly subscription: Constructor<ICommand>

  get subscription(): Constructor<ICommand> {
    return (this.constructor as typeof ICommandHandler).subscription
  }

  abstract handle<R = void>(command: C): CommandResponse<R>
}
