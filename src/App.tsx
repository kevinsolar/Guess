import styles from "./app.module.css"

import { WORDS } from "./utils/words"

import { Button } from "./components/Button"
import { Header } from "./components/Header"
import { Input } from "./components/Input"
import { Letter } from "./components/Letter"
import { LettersUsed } from "./components/LettersUsed"
import { Tip } from "./components/Tip"

function App() {
	function handleRestart() {
		alert("Reiniciar o jogo!")
	}

	return (
		<main className={styles.container}>
			<Header current={5} max={10} onRestart={handleRestart} />
			<section id="top">
				<Tip tip="Uma das linguagens de promacao mais utilizadas!" />

				<div className={styles.word}>
					<Letter value="R" />
					<Letter value="" />
					<Letter value="" />
					<Letter value="" />
					<Letter value="T" />
				</div>

				<h4>Palpite</h4>

				<div className={styles.guess}>
					<Input autoFocus maxLength={1} placeholder="?" />
					<Button title="Confirmar" />
				</div>
			</section>
			<section id="bottom">
				<LettersUsed />
			</section>
		</main>
	)
}

export default App
