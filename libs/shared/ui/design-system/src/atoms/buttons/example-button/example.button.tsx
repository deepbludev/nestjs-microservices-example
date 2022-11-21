import { Button as MantineButton } from '@mantine/core'
import { clsx } from 'clsx'

import { Props } from '../../../utils/types/props.type.util'

type MatineButtonProps = Props<typeof MantineButton>

export type ExampleButtonColor =
  | 'red'
  | 'orange'
  | 'blue'
  | 'green'
  | 'teal'
  | 'cyan'

export type ExampleButtonProps = {
  color?: ExampleButtonColor
} & Omit<MatineButtonProps, 'color'>

const buttonColor: { [key in ExampleButtonColor]: string } = {
  red: 'bg-red-600 hover:bg-red-500',
  orange: 'bg-orange-600 hover:bg-orange-500',
  blue: 'bg-blue-600 hover:bg-blue-500',
  green: 'bg-green-600 hover:bg-green-500',
  teal: 'bg-teal-600 hover:bg-teal-500',
  cyan: 'bg-cyan-600 hover:bg-cyan-500',
}

export function ExampleButton({
  color = 'blue',
  ...buttonProps
}: ExampleButtonProps) {
  return (
    <MantineButton
      className={clsx(
        buttonColor[color],
        'rounded-md max-w-sm',
        'text-xl text-white text-center'
      )}
      {...buttonProps}
    />
  )
}
