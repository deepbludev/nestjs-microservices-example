import { Button as MantineButton } from '@mantine/core'
import { clsx } from 'clsx'

import { Props } from '../../utils/types/props.type.util'

type MatineButtonProps = Props<typeof MantineButton>

export type ButtonProps = {
  color?: 'red' | 'blue' | 'green' | 'yellow' | 'gray' | 'cyan'
} & Omit<MatineButtonProps, 'color'>

const buttonColor = (color: ButtonProps['color'] = 'blue') =>
  `bg-${color}-500 hover:bg-${color}-700`

export function Button({ color, ...buttonProps }: ButtonProps) {
  return (
    <MantineButton
      className={clsx(
        buttonColor(color),
        'rounded-md max-w-sm',
        'text-xl text-white text-center'
      )}
      {...buttonProps}
    />
  )
}
