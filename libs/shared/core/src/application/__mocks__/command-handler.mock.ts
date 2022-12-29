import {
  commandHandler,
  CommandResponse,
  ICommandHandler,
  Result,
} from '../../domain'
import {
  CreateAggregateStub,
  ToggleAggregateStub,
  UpdatePropsStub,
} from '../../domain/__mocks__'

@commandHandler(CreateAggregateStub)
export class CreateAggregateHandlerMock extends ICommandHandler<CreateAggregateStub> {
  _handle: jest.Mock = jest.fn()

  async handle<R = void>(command: CreateAggregateStub): CommandResponse<R> {
    this._handle(command)
    return Result.ok()
  }
}

export class UpdatePropsHandlerMock extends ICommandHandler<UpdatePropsStub> {
  static override readonly subscription = UpdatePropsStub
  _handle: jest.Mock = jest.fn()

  async handle<R = void>(command: UpdatePropsStub): CommandResponse<R> {
    this._handle(command)
    return Result.ok()
  }
}

export class ToggleAggregateHandlerMock extends ICommandHandler<ToggleAggregateStub> {
  _handle: jest.Mock = jest.fn()

  override get subscription() {
    return ToggleAggregateStub
  }

  async handle<R = void>(command: ToggleAggregateStub): CommandResponse<R> {
    this._handle(command)
    return Result.ok()
  }
}

export class EmptyCommandHandlerMock extends ICommandHandler<ToggleAggregateStub> {
  _handle: jest.Mock = jest.fn()

  async handle<R = void>(command: ToggleAggregateStub): CommandResponse<R> {
    this._handle(command)
    return Result.ok()
  }
}
