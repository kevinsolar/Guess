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

	const [attempts, setAttempts] = useState(0)

	function handleRestart() {
		startGame()
	}

	function handleDifficulty(difficulty: "easy" | "normal" | "hard") {
		if (difficulty === "easy") {
			setAttempts(4)
		}
		if (difficulty === "normal") {
			setAttempts(2)
		}
		if (difficulty === "hard") {
			setAttempts(1)
		}
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
      setLetter("")
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

	function endGame(message: string) {
		alert(message)
		startGame()
	}

	useEffect(() => {
		if (!challenge) {
			return
		}

		setTimeout(() => {
			if (score === challenge.word.length) {
				return endGame("Parabens vc descobriu a palavra!")
			}

			const attemptLimit = challenge.word.length + attempts

			if (lettersUsed.length === attemptLimit) {
				return endGame("Que pena, voce usou todas as tentativas!")
			}
		}, 200)
	}, [score, lettersUsed.length])

	if (!challenge) {
		return
	}

	return (
		<main className={styles.container}>
			<Header
				current={lettersUsed.length}
				max={challenge.word.length + attempts}
				onRestart={handleRestart}
			/>

			{attempts === 0 && (
				<section id="popup" className={styles.popup}>
					<div className={styles.popupContainer}>
						<h1>Selecione a dificuldade:</h1>
						<div className={styles.difficultyContainer}>
							<Button title="Facil" onClick={() => handleDifficulty("easy")} />
							<Button
								title="Normal"
								onClick={() => handleDifficulty("normal")}
							/>
							<Button
								title="Dificil"
								onClick={() => handleDifficulty("hard")}
							/>
						</div>
					</div>
				</section>
			)}

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
