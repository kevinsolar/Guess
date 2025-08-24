import styles from "./styles.module.css"

export function Popup({ children, title }: any) {
	return (
		<section id="popup" className={styles.popup}>
			<div className={styles.popupContainer}>
				<h1>{title}</h1>
				<div className={styles.difficultyContainer}>{children}</div>
			</div>
		</section>
	)
}
