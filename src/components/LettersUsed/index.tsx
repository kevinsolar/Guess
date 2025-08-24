import { Letter } from "../Letter"
import styles from "./styles.module.css"

export type LettersUsedProps = {
	value: string
	correct: boolean
}

type Props = {
	data: LettersUsedProps[]
}

export function LettersUsed({ data }: Props) {
	return (
		<div className={styles.lettersUsed}>
			<h5>Letras Utilizadas</h5>

			<div className={styles.lettersContainer}>
				{data.map(({ value, correct }) => (
					<Letter
						key={value}
						value={value}
						size="small"
						color={correct ? "correct" : "wrong"}
					/>
				))}
			</div>
		</div>
	)
}
