import { Button as MantineButton } from '@mantine/core'
import { clsx } from 'clsx'

import { Props } from '../../utils/types/props.type.util'

type MatineButtonProps = Props<typeof MantineButton>

const buttonColor = (color: MatineButtonProps['color']) =>
  `bg-${color}-500 hover:bg-${color}-700`

export type ButtonProps = MatineButtonProps & {
  color?: 'red' | 'blue' | 'green' | 'yellow' | 'gray' | 'cyan'
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
