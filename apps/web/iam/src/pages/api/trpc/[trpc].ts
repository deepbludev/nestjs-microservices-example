import * as trpcNext from '@trpc/server/adapters/next'

import { appRouter } from '../../../infra/trpc/routers/_app.router'

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
})
