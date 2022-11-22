import { RobotoFont } from './roboto.font'
import { UbuntuFont } from './ubuntu.font'

export function FontsProvider() {
  return (
    <>
      <RobotoFont />
      <UbuntuFont />
    </>
  )
}

export const ObeyaFont = {
  TEXT: '"Roboto", sans-serif',
  HEADING: '"Ubuntu", sans-serif',
} as const
