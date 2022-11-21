import { Button as MantineButton } from '@mantine/core'
import { clsx } from 'clsx'

import { Props } from '../../../utils/types/props.type.util'

type MatineButtonProps = Props<typeof MantineButton>

export type ExampleButtonColor = 'primary' | 'green' | 'brown' | 'gray'

export type ExampleButtonProps = {
  color?: ExampleButtonColor
} & Omit<MatineButtonProps, 'color'>

const buttonColor: { [key in ExampleButtonColor]: string } = {
  primary: 'bg-primary-900 hover:bg-primary-400',
  green: 'bg-green-900 hover:bg-green-400',
  brown: 'bg-brown-900 hover:bg-brown-400',
  gray: 'bg-gray-900 hover:bg-gray-400',
}

export function ExampleButton({
  color = 'primary',
  ...buttonProps
}: ExampleButtonProps) {
  return (
    <MantineButton
      className={clsx(
        buttonColor[color],
        'rounded-md max-w-sm',
        'text-white text-center'
      )}
      {...buttonProps}
    />
  )
}
