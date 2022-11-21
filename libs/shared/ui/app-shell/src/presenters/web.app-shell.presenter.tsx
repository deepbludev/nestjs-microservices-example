import {
  NotificationsProvider,
  UiFrameworkProvider,
} from '@obeya/shared/ui/design-system'

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
