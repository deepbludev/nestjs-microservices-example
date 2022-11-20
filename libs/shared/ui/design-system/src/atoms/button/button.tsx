import {
  Button as MantineButton,
  ButtonProps as MantineButtonProps,
} from '@mantine/core'
import { clsx } from 'clsx'

const buttonColor = (color: ButtonProps['color']) =>
  `bg-${color}-500 hover:bg-${color}-700`
export interface ButtonProps extends MantineButtonProps {
  color?: 'red' | 'blue'
}

export function Button({ color, ...buttonProps }: ButtonProps) {
  return (
    <MantineButton
      className={clsx(
        buttonColor(color ?? 'blue'),
        'rounded-md max-w-sm',
        'text-xl text-white text-center'
      )}
      {...buttonProps}
    />
  )
}

export default Button
