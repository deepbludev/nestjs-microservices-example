export const RabbitMQ = Object.freeze({
  uri: 'rmqUri',
  queue: (queue: string) => 'rmqQueue_' + queue,
})
