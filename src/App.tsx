import styles from "./app.module.css"

import { WORDS, type Challenge } from "./utils/words"

import { Button } from "./components/Button"
import { Header } from "./components/Header"
import { Input } from "./components/Input"
import { Letter } from "./components/Letter"
import { LettersUsed, type LettersUsedProps } from "./components/LettersUsed"
import { Tip } from "./components/Tip"

import { useEffect, useState } from "react"

function App() {
	const [score, setScore] = useState(0)
	const [letter, setLetter] = useState("")
	const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([])
	const [challenge, setChallenge] = useState<Challenge | null>(null)

	function handleRestart() {
		alert("Reiniciar o jogo!")
	}

	function startGame() {
		const index = Math.floor(Math.random() * WORDS.length)
		const randomWord = WORDS[index]

		setChallenge(randomWord)

		setScore(0)
		setLetter("")
		setLettersUsed([])
	}

	function handleConfirm() {
		if (!challenge) return

		if (!letter.trim()) {
			return alert("Digite uma letra!")
		}

		const value = letter.toUpperCase()

		const exists = lettersUsed.find(
			(used) => used.value.toUpperCase() === value
		)

		if (exists) {
			return alert("Voce ja utilizou a letra " + value)
		}

		const hits = challenge.word
			.toUpperCase()
			.split("")
			.filter((char) => char === value).length

		const correct = hits > 0
		const currentScore = score + hits

		setLettersUsed((prevState) => [...prevState, { value, correct }])
		setScore(currentScore)
		setLetter("")
	}

	useEffect(() => {
		startGame()
	}, [])

	if (!challenge) {
		return
	}

	return (
		<main className={styles.container}>
			<Header current={score} max={10} onRestart={handleRestart} />
			<section id="top">
				<Tip tip={challenge.tip} />

				<div className={styles.word}>
          {/* Renderiza cada quadradinho de acrodo com a quantidade de letras da palavra selecionada */}
					{challenge.word.split("").map((letter, index) => {
						const letterUsed = lettersUsed.find(
							(used) => used.value.toUpperCase() === letter.toUpperCase()
						)
						return <Letter key={index} value={letterUsed?.value} />
					})}
				</div>

				<h4>Palpite</h4>

				<div className={styles.guess}>
					<Input
						autoFocus
						maxLength={1}
						placeholder="?"
						value={letter}
						onChange={(e) => setLetter(e.target.value)}
					/>
					<Button title="Confirmar" onClick={handleConfirm} />
				</div>
			</section>
			<section id="bottom">
				<LettersUsed data={lettersUsed} />
			</section>
		</main>
	)
}

export default App
