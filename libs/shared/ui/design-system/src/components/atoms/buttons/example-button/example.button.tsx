import { Button as MantineButton } from '@mantine/core'
import { clsx } from 'clsx'

import { Props } from '../../../../utils/types/props.type.util'

type MatineButtonProps = Props<typeof MantineButton>

export type ExampleButtonColor = 'primary' | 'action' | 'background' | 'bnw'

export type ExampleButtonProps = {
  color?: ExampleButtonColor
} & Omit<MatineButtonProps, 'color'>

export const buttonColor: { [key in ExampleButtonColor]: string } = {
  primary: 'bg-primary-100 hover:bg-primary-80',
  action: 'bg-action-100 hover:bg-action-80',
  background: 'bg-background-100 hover:bg-background-80',
  bnw: 'bg-bnw-100 hover:bg-bnw-80',
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
