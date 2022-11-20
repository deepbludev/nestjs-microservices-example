import { clsx } from 'clsx'

const buttonColor = (color: ButtonProps['color']) =>
  `bg-${color}-500 hover:bg-${color}-700`
export interface ButtonProps {
  text: string
  color?: 'red' | 'blue'
}

export function Button({ text, color }: ButtonProps) {
  return (
    <div
      className={clsx(
        buttonColor(color ?? 'blue'),
        'rounded-md max-w-sm',
        'p-4 m-4',
        'text-xl text-white text-center'
      )}
    >
      <h1>{text}</h1>
    </div>
  )
}

export default Button
