import styles from './button.module.css'

/* eslint-disable-next-line */
export interface ButtonProps {
  text: string
}

export function Button({ text }: ButtonProps) {
  return (
    <div className={styles['container']}>
      <h1>{text}</h1>
    </div>
  )
}

export default Button
