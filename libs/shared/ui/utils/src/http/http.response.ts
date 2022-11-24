export interface HttpResponse<D = void> {
  message: string
  data: D | null
}
