import { z } from 'zod'

import { procedure, router } from '../trpc'

export const appRouter = router({
  status: procedure
    .input(
      z.object({
        text: z.string().optional(),
        date: z.date().optional(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text ?? 'world'}`,
        date: input.date ?? 'no date',
      }
    }),
})

// export type definition of API
export type AppRouter = typeof appRouter
