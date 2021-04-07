import React from "react"
import styles from "./css-modules.module.scss"

export default function CssModules() {
	return (
		<div>
			<h2>CSS Modules</h2>
			<div className={styles.box}>I am styled with a CSS module!</div>
		</div>
	)
}
