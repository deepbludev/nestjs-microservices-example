import { NotificationsProvider as MantineNotificationsProvider } from '@mantine/notifications'

interface NotificationsProviderProps {
  children?: React.ReactNode
}

export const NotificationsProvider = ({
  children,
}: NotificationsProviderProps) => (
  <MantineNotificationsProvider>{children}</MantineNotificationsProvider>
)

export default NotificationsProvider
