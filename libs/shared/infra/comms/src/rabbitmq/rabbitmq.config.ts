import { RabbitMQ } from '@lean/shared/infra/comms'

export const rmqConfig = () => ({
  rmqUri: process.env.RABBITMQ_URI || 'amqp://user:pass@rmq-broker:5672',
  rmqQueue: (queue: string) =>
    process.env[RabbitMQ.QUEUE(queue)] || RabbitMQ.QUEUE(queue),
})
