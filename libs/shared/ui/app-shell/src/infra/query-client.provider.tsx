import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from '@tanstack/react-query'

interface QueryClientProviderProps {
  children?: React.ReactNode
}

const queryClient = new QueryClient()

export function QueryClientProvider({ children }: QueryClientProviderProps) {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  )
}
