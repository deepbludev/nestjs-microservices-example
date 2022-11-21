import { MantineProvider, MantineThemeOverride } from '@mantine/core'

import { baseTheme } from './base.theme'

interface UIFrameworkProviderProps {
  children: React.ReactNode
  theme?: MantineThemeOverride
}

export const UiFrameworkProvider = ({
  children,
  theme,
}: UIFrameworkProviderProps) => (
  <MantineProvider withGlobalStyles withNormalizeCSS theme={theme ?? baseTheme}>
    {children}
  </MantineProvider>
)

export default UiFrameworkProvider
