import { ICommandHandler, InMemoryCommandBus } from '@deepblu/ddd'
import { Inject, Injectable } from '@nestjs/common'

import { CQRS } from './cqrs.tokens'

@Injectable()
export class CommandBus extends InMemoryCommandBus {
  constructor(
    @Inject(CQRS.COMMAND_HANDLERS)
    private readonly commandHandlers: ICommandHandler[]
  ) {
    super()
    this.register(this.commandHandlers)
  }
}
