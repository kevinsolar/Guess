import { Letter } from "../Letter"
import styles from "./styles.module.css"

export function LettersUsed() {
  return (
    <div className={styles.lettersUsed}>
      <h5>Letras Utilizadas</h5>

      <div className={styles.lettersContainer}>
        <Letter value="R" size="small" color="correct"  />
        <Letter value="X" size="small" color="wrong" />
      </div>
    </div>
  )
}