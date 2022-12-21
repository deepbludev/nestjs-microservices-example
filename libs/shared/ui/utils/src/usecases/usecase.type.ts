export type UseCase<TRequest, TResponse> = (request: TRequest) => TResponse
