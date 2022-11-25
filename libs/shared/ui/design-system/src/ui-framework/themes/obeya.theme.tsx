import 'dayjs/locale/es'

import { MantineThemeOverride } from '@mantine/core'

import { ObeyaColors } from '../../colors/obeya.colors'
import { ObeyaFont } from '../../fonts/fonts.provider'
import { toColorTuple } from './theme.utils'

export type ObeyaTheme = Pick<
  MantineThemeOverride,
  /** Colors */
  | 'colors'
  | 'primaryColor'

  /** Breakpoints */
  | 'breakpoints'

  /** Fonts */
  | 'fontFamily'
  | 'headings'

  /** Dates */
  | 'datesLocale'
  | 'dateFormat'

  /** Loader */
  | 'loader'

  /** Other */
  | 'other'
>

export const obeyaTheme: ObeyaTheme = {
  /** Colors */
  colors: {
    'dark-green': toColorTuple(ObeyaColors['dark-green']),
    'light-green': toColorTuple(ObeyaColors['light-green']),
    'light-gray': toColorTuple(ObeyaColors['light-gray']),
    grayscale: toColorTuple(ObeyaColors.grayscale),
  },
  primaryColor: 'dark-green',

  /** Breakpoints */
  // override defaults to match tailwind breakpoints
  breakpoints: {
    xs: 640,
    sm: 768,
    md: 1024,
    lg: 1280,
    xl: 1536,
  },

  /** Fonts */
  fontFamily: ObeyaFont.TEXT,
  headings: {
    fontFamily: ObeyaFont.HEADING,
  },

  /** Dates */
  datesLocale: 'en',
  dateFormat: 'D/M/YY',

  /** Loader */
  loader: 'dots',

  /** Other */
  other: {
    colors: ObeyaColors,
  },
}
