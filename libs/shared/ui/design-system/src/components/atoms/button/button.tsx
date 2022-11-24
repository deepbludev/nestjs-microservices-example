import { Button as MantineButton } from '@mantine/core'
import { clsx } from 'clsx'

import { Props } from '../../../types/props.type.util'

type MatineButtonProps = Props<typeof MantineButton>

export type ButtonColor = 'primary' | 'action' | 'light' | 'bnw'

export type ButtonProps = {
  color?: ButtonColor
} & MatineButtonProps

export const buttonColor: { [key in ButtonColor]: string } = {
  primary: 'bg-primary-100 hover:bg-primary-80',
  action: 'bg-action-100 hover:bg-action-80',
  light: 'bg-light-100 hover:bg-light-80',
  bnw: 'bg-bnw-100 hover:bg-bnw-80',
}

export function Button({ color, ...buttonProps }: ButtonProps) {
  return (
    <MantineButton
      className={clsx(
        color ? buttonColor[color] : buttonColor['primary'],
        'rounded-md min-w-md',
        'text-white text-center'
      )}
      {...buttonProps}
    />
  )
}
