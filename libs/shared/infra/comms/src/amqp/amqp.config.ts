export const amqpConfig = () => ({
  amqpUri: process.env.AMQP_URI || 'amqp://guest:guest@localhost:5672',
})
