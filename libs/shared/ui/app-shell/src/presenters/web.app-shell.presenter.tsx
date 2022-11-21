import { NotificationsProvider } from '../providers/notifications.provider'
import { UiFrameworkProvider } from '../providers/ui-framework.provider'

export interface WebAppShellProps {
  children: React.ReactNode
}

export function WebAppShell({ children }: WebAppShellProps) {
  return (
    <UiFrameworkProvider>
      <NotificationsProvider>{children}</NotificationsProvider>
    </UiFrameworkProvider>
  )
}

export default WebAppShellProps
