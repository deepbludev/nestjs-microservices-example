import 'dayjs/locale/es'

import { MantineThemeOverride } from '@mantine/core'

export type ObeyaTheme = Pick<
  MantineThemeOverride,
  | 'breakpoints'
  | 'colors'
  | 'primaryColor'
  | 'fontFamily'
  | 'headings'
  | 'datesLocale'
  | 'dateFormat'
>

export const obeyaTheme: ObeyaTheme = {
  breakpoints: {
    // override defaults to match tailwind breakpoints
    xs: 640,
    sm: 768,
    md: 1024,
    lg: 1280,
    xl: 1536,
  },
  colors: {},
  primaryColor: 'red',

  fontFamily: '"Roboto", sans-serif',

  headings: {
    fontFamily: '"Ubuntu", serif',
  },

  datesLocale: 'en',
  dateFormat: 'D/M/YY',
}
