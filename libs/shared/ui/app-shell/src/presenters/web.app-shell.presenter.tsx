import { MantineProvider } from '@mantine/core'

export interface WebAppShellProps {
  children: React.ReactNode
}

export function WebAppShell({ children }: WebAppShellProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: 'light',
      }}
    >
      {children}
    </MantineProvider>
  )
}

export default WebAppShellProps
