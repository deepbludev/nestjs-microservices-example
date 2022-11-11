export const amqpConfig = () => ({
  amqpUri: process.env.AMQP_URI || 'amqp://guest:guest@rabbitmq:5672',
})
