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
    .output(
      z.object({
        greeting: z.string(),
        date: z.date(),
      })
    )
    .query(({ input: { text, date } }) => {
      return {
        greeting: `hello ${text ?? 'world'}`,
        date: date ?? new Date(),
      }
    }),
})

// export type definition of API
export type AppRouter = typeof appRouter
