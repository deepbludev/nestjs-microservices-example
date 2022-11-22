import { httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import superjson from 'superjson'

import type { AppRouter } from './routers/_app.router'

function baseUrl() {
  if (typeof window !== 'undefined') return ''

  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}` // reference for vercel.com
    : `http://localhost:${process.env.PORT ?? 4200}` // assume localhost
}

const transformer = superjson

const links = [
  // adds pretty logs to your console in development and logs errors in production
  loggerLink({
    enabled: opts =>
      process.env.NODE_ENV === 'development' ||
      (opts.direction === 'down' && opts.result instanceof Error),
  }),
  httpBatchLink({
    url: `${baseUrl()}/api/trpc`,
  }),
]

const queryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 10,
    },
  },
}

export const trpc = createTRPCNext<AppRouter>({
  config: ({ ctx }) => ({
    transformer,
    links,
    queryClientConfig,
  }),
  ssr: false,
})
