import { MantineThemeOverride } from '@mantine/core'
import 'dayjs/locale/es'

export const breakpoints = {
  xs: 640,
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1536,
}

export const baseTheme: MantineThemeOverride = {
  breakpoints,
  colorScheme: 'dark',
  primaryColor: 'red',
  fontFamily: '"Inter", sans-serif',
  datesLocale: 'es',
  dateFormat: 'D/M/YY',
}
