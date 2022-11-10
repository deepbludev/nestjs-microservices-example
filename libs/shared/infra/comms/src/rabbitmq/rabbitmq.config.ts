import { RabbitMQ } from './rabbitmq.constants'

export const rmqConfig = () => ({
  rmqUri: process.env.RABBITMQ_URI || 'amqp://user:pass@rmq-broker:5672',
  rmqQueue: (queue: string) =>
    process.env[RabbitMQ.QUEUE(queue)] || RabbitMQ.QUEUE(queue),
})
