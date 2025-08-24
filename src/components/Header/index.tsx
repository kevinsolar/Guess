import logo from "../../assets/logo.png"
import restart from "../../assets/restart.svg"

import styles from "./styles.module.css"

type Props = {
  current: number
  max: number
  onRestart: () => void
}

export function Header({ current, max, onRestart }: Props) {
	return (
		<header className={styles.container}>
			<img src={logo} alt="Logo" />

      <div className={styles.tries}>
        <span>
          <strong>{current}</strong> de {max} erros
        </span>

        <button type="button" onClick={onRestart}>
          <img src={restart} alt="Reiniciar" />
        </button>
      </div>
		</header>
	)
}
