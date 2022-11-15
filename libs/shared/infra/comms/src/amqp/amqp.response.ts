export interface AmqpResponse<T> {
  data?: T
  statusCode: number
  message: string
}
