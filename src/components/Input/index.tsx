import { forwardRef } from "react"
import styles from "./styles.module.css"

type Props = React.ComponentProps<"input">

export const Input = forwardRef<HTMLInputElement, Props>(function Input({...rest}, ref) {
  return <input ref={ref} type="text" className={styles.input} {...rest} />
})