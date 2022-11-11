export const RabbitMQ = Object.freeze({
  URI: 'rmqUri',
  QUEUE: (queue: string) => 'rmqQueue_' + queue,
})
