import { MantineProvider } from '@mantine/core'

import { ObeyaTheme, obeyaTheme } from './obeya.theme'

interface UIFrameworkProviderProps {
  children: React.ReactNode
  theme?: ObeyaTheme
}

export const UiFrameworkProvider = ({
  children,
  theme,
}: UIFrameworkProviderProps) => (
  <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={theme ?? obeyaTheme}
  >
    {children}
  </MantineProvider>
)

export default UiFrameworkProvider
