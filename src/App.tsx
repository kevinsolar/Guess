import styles from "./app.module.css"

import { WORDS, type Challenge } from "./utils/words"

import { Button } from "./components/Button"
import { Header } from "./components/Header"
import { Input } from "./components/Input"
import { Letter } from "./components/Letter"
import { LettersUsed, type LettersUsedProps } from "./components/LettersUsed"
import { Tip } from "./components/Tip"

import { useEffect, useState, useRef } from "react"
import { Popup } from "./components/Popup"

function App() {
	const [score, setScore] = useState(0)
	const [letter, setLetter] = useState("")
	const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([])
	const [challenge, setChallenge] = useState<Challenge | null>(null)

	const [maxAttempts, setMaxAttempts] = useState(0)
	const [wrongAttempts, setWrongAttempts] = useState(0)
	const inputRef = useRef<HTMLInputElement>(null)

	function focusInput() {
		setTimeout(() => {
			inputRef.current?.focus()
		}, 100)
	}

	function handleRestart() {
		startGame()
	}

	function handleDifficulty(difficulty: "easy" | "normal" | "hard") {
		if (difficulty === "easy") {
			setMaxAttempts(4)
		}
		if (difficulty === "normal") {
			setMaxAttempts(2)
		}
		if (difficulty === "hard") {
			setMaxAttempts(1)
		}
		focusInput()
	}

	function startGame() {
		const index = Math.floor(Math.random() * WORDS.length)
		const randomWord = WORDS[index]

		setChallenge(randomWord)

		setScore(0)
		setWrongAttempts(0)
		setLetter("")
		setLettersUsed([])
		focusInput()
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			handleConfirm()
		}
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
			focusInput()
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

		// Incrementa tentativas apenas se for erro
		if (!correct) {
			setWrongAttempts((prev) => prev + 1)
		}

		setLetter("")
		focusInput()
	}

	useEffect(() => {
		startGame()
	}, [])

	function endGame(message: string) {
		alert(message)
		startGame()
	}

	useEffect(() => {
		if (!challenge || maxAttempts === 0) {
			return
		}

		setTimeout(() => {
			if (score === challenge.word.length) {
				return endGame("Parabens vc descobriu a palavra!")
			}

			if (wrongAttempts > maxAttempts) {
				return endGame("Que pena, voce errou o máximo permitido!")
			}
		}, 200)
	}, [score, wrongAttempts, challenge, maxAttempts])

	if (!challenge) {
		return
	}

	return (
		<main className={styles.container}>
			<Header
				current={wrongAttempts}
				max={maxAttempts}
				onRestart={handleRestart}
			/>

			{maxAttempts === 0 && (
				<Popup title="Selecione a dificuldade:">
					<Button title="Facil" onClick={() => handleDifficulty("easy")} />
					<Button title="Normal" onClick={() => handleDifficulty("normal")} />
					<Button title="Dificil" onClick={() => handleDifficulty("hard")} />
				</Popup>
			)}

			<section id="top">
				<Tip tip={challenge.tip} />

				<div className={styles.word}>
					{/* Renderiza cada quadradinho de acordo com a quantidade de letras da palavra selecionada */}
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
						ref={inputRef}
						maxLength={1}
						placeholder="?"
						value={letter}
						onChange={(e) => setLetter(e.target.value)}
						onKeyDown={handleKeyDown}
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
