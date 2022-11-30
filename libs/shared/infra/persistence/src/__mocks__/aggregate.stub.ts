import { IUniqueID, Payload, Result } from '@obeya/shared/core'
import { AggregateDTO, AggregateRoot } from '@obeya/shared/domain'

import {
  AggregateCreatedStub,
  AggregateToggledStub,
  PropsUpdatedStub,
} from './events.stub'

export interface AggregateStubDTO extends AggregateDTO {
  foo: string
  bar: number
  is: boolean
}

export class AggregateStub extends AggregateRoot<
  AggregateStubDTO,
  IUniqueID,
  { foo: string; bar?: number; is?: boolean }
> {
  get dto(): AggregateStubDTO {
    return {
      id: this.id.value,
      foo: this.props.foo || '',
      bar: this.props.bar || 0,
      is: this.props.is,
      version: this.version,
    }
  }

  static from(dto: AggregateStubDTO): AggregateStub {
    const aggregate = AggregateStub.createEmpty<AggregateStub>()
    aggregate.id = IUniqueID.from(dto.id).data
    aggregate._version = dto.version
    aggregate.props.foo = dto.foo
    aggregate.props.bar = dto.bar
    aggregate.props.is = dto.is

    return aggregate
  }

  /**
   * Creates a new aggregate stub from initial props
   * @factory
   * @command CreateAggregateStub
   * @event AggregateCreatedStub
   * @param aggregateId - the id of the aggregate
   * @param payload - the aggregate props on creation
   */

  static create(
    payload: Payload<AggregateCreatedStub>,
    id?: IUniqueID
  ): Result<AggregateStub> {
    const aggregate = new AggregateStub(payload, id)
    aggregate.apply(AggregateCreatedStub.with(aggregate.id, payload))
    return Result.ok(aggregate)
  }

  protected onAggregateCreatedStub(event: AggregateCreatedStub): void {
    this.id = IUniqueID.from(event.aggregateId).data
    this.props.foo = event.payload.foo || ''
    this.props.is = !!event.payload.is
  }

  /**
   * Updates the mock aggregate props to the given values
   * @command UpdatePropsStub - update the aggregate props
   * @event PropsUpdatedStub
   * @param payload - the props to update
   */

  updateProps(payload: Payload<PropsUpdatedStub>): void {
    this.apply(PropsUpdatedStub.with(this.id, payload))
  }

  protected onPropsUpdatedStub(event: PropsUpdatedStub): void {
    this.props.foo = event.payload.foo || this.props.foo
    this.props.is = Reflect.has(event.payload, 'is')
      ? !!event.payload.is
      : this.props.is
  }

  /**
   * Toggles the mock aggregate state
   * @command ToggleStub
   * @event AggregateToggledStub
   */

  toggle(): void {
    this.apply(AggregateToggledStub.with(this.id, {}))
  }

  protected onAggregateToggledStub(): void {
    this.props.is = !this.props.is
  }

  /** getters */

  get foo(): string {
    return this.props.foo || ''
  }

  get is(): boolean {
    return !!this.props.is
  }
}
