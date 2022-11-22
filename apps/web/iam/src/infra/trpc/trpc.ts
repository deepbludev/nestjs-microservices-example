import { initTRPC } from '@trpc/server'
import superjson from 'superjson'

export const { router, middleware, procedure } = initTRPC.create({
  transformer: superjson,
})
