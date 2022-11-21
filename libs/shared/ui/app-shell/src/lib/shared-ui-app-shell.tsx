import styles from './shared-ui-app-shell.module.css'

/* eslint-disable-next-line */
export interface AppShellProps {}

export function AppShell(props: AppShellProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to SharedUiAppShell!</h1>
    </div>
  )
}

export default AppShellProps
