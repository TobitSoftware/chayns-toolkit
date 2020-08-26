import React from "react"
import styles from "./app.module.css"
import CssModules from "./components/css-modules/CssModules"
import HmrTest from "./components/hmr-test/HmrTest"

export default function App() {
	return (
		<div className={styles.container}>
			<CssModules />
			<HmrTest />
		</div>
	)
}
