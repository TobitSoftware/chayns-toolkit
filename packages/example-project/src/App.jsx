import React from "react"
import styles from "./app.module.css"
import CssModules from "./components/css-modules/CssModules"
import FileLoaderTest from "./components/file-loader-test/FileLoaderTest"
import HmrTest from "./components/hmr-test/HmrTest"
import SvgTest from "./components/svg-test/SvgTest"
import UrlLoaderTest from "./components/url-loader-test/UrlLoaderTest"

export default function App() {
	return (
		<div className={styles.container}>
			<CssModules />
			<HmrTest />
			<FileLoaderTest />
			<UrlLoaderTest />
			<SvgTest />
		</div>
	)
}
