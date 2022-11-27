import {
  EmptyEventSubscriberMock,
  EventSubscriberMock,
  OtherEventSubscriberMock,
} from '../../../../application/__mocks__'
import {
  EmptyEventSubscriberError,
  IEventSubscriber,
  IUniqueID,
} from '../../../../domain'
import {
  AggregateCreatedStub,
  AggregateToggledStub,
  PropsUpdatedStub,
} from '../../../../domain/__mocks__'
import { InMemoryAsyncEventBus } from '../in-memory-async.event-bus'

describe(InMemoryAsyncEventBus, () => {
  it('should be defined', () => {
    expect(InMemoryAsyncEventBus).toBeDefined()
  })

  let eventbus: InMemoryAsyncEventBus
  let subscriber: IEventSubscriber
  let otherSubscriber: IEventSubscriber
  let emptySubscriber: IEventSubscriber

  let aggrId: IUniqueID
  let createEvent: AggregateCreatedStub
  let updateEvent: PropsUpdatedStub
  let toggleEvent: AggregateToggledStub

  let emitSpy: jest.SpyInstance

  beforeAll(async () => {
    eventbus = new InMemoryAsyncEventBus()
    subscriber = new EventSubscriberMock()
    otherSubscriber = new OtherEventSubscriberMock()
    emptySubscriber = new EmptyEventSubscriberMock()

    aggrId = IUniqueID.create()
    createEvent = AggregateCreatedStub.with(aggrId, { foo: 'bar', is: true })
    updateEvent = PropsUpdatedStub.with(aggrId, { foo: 'baz' })
    toggleEvent = AggregateToggledStub.with(aggrId, {})

    emitSpy = jest.spyOn(eventbus, 'emit')

    eventbus.register([subscriber, otherSubscriber])
    await eventbus.publish([createEvent, updateEvent, toggleEvent])
  })

  it('should be able to register subscribers', () => {
    expect(eventbus.listenerCount(AggregateCreatedStub.canonical)).toBe(1)
    expect(eventbus.listenerCount(PropsUpdatedStub.canonical)).toBe(2)
    expect(eventbus.listenerCount(AggregateToggledStub.canonical)).toBe(1)
  })

  it('should be able to publish events', () => {
    expect(emitSpy).toHaveBeenCalledTimes(3)
    expect(emitSpy).toHaveBeenCalledWith(createEvent.canonical, createEvent)
    expect(emitSpy).toHaveBeenCalledWith(updateEvent.canonical, updateEvent)
    expect(emitSpy).toHaveBeenCalledWith(toggleEvent.canonical, toggleEvent)
  })

  it('should throw when registering an empty subscriber', () => {
    expect(() => eventbus.register([emptySubscriber])).toThrowError(
      EmptyEventSubscriberError.with(emptySubscriber)
    )
  })
})
