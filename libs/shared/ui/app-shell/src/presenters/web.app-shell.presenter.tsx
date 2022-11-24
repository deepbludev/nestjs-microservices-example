import {
  NotificationsProvider,
  UiFrameworkProvider,
} from '@obeya/shared/ui/design-system'

import { QueryClientProvider } from '../infra/query-client.provider'

export interface WebAppShellProps {
  children: React.ReactNode
}

export function WebAppShell({ children }: WebAppShellProps) {
  return (
    <QueryClientProvider>
      <UiFrameworkProvider>
        <NotificationsProvider>{children}</NotificationsProvider>
      </UiFrameworkProvider>
    </QueryClientProvider>
  )
}

export default WebAppShellProps
