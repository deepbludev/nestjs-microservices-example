export const RabbitMQ = Object.freeze({
  URI: 'RABBITMQ_URI',
  QUEUE: (queue: string) => 'RABBITMQ_QUEUE_' + queue,
})
