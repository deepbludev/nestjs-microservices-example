import { ICommand } from './command.abstract'
import { CommandResponse } from './command-handler.abstract'

export abstract class ICommandBus {
  abstract dispatch<R = void>(command: ICommand): CommandResponse<R>
}
