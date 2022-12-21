import { Constructor } from '../../types'
import { ICommand } from '../command.abstract'
import { ICommandHandler } from '../command-handler.abstract'

export const commandHandler = (command: Constructor<ICommand>) =>
  function <
    T extends Constructor<ICommandHandler> & {
      subscription: Constructor<ICommand>
    }
  >(CommandHandlerClass: T) {
    CommandHandlerClass.subscription = command
  }
