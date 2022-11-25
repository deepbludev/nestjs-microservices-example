import { Button as MantineButton } from '@mantine/core'
import { clsx } from 'clsx'

import { ObeyaColor } from '../../../colors/obeya.colors'
import { Props } from '../../../types/props.type.util'

export type ButtonColor = ObeyaColor
export type ButtonProps = {
  color?: ButtonColor
} & Props<typeof MantineButton>

export const buttonColor: { [key in ButtonColor]: string } = {
  primary: 'bg-primary-100 hover:bg-primary-80 text-white',
  action: 'bg-action-100 hover:bg-action-80 text-white',
  light: 'bg-light-100 hover:bg-light-80 text-bnw-60',
  bnw: 'bg-bnw-100 hover:bg-bnw-90 text-white ',
}

export function Button({ color, ...buttonProps }: ButtonProps) {
  return (
    <MantineButton
      className={clsx(
        color ? buttonColor[color] : buttonColor['primary'],
        'rounded-md min-w-md',
        'text-center'
      )}
      {...buttonProps}
    />
  )
}
