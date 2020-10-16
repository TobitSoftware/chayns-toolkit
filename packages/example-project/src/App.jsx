import React from "react"
import styles from "./app.module.css"
import CorejsTest from "./components/corejs-test/CorejsTest"
import CssModules from "./components/css-modules/CssModules"
import EnvTest from "./components/env-test/EnvTest"
import FileLoaderTest from "./components/file-loader-test/FileLoaderTest"
import HmrTest from "./components/hmr-test/HmrTest"
import SvgTest from "./components/svg-test/SvgTest"
import TsTest from "./components/ts-test/TsTest"
import UrlLoaderTest from "./components/url-loader-test/UrlLoaderTest"

export default function App() {
	return (
		<div className={styles.container}>
			<CssModules />
			<HmrTest />
			<FileLoaderTest />
			<UrlLoaderTest />
			<SvgTest />
			<TsTest />
			<CorejsTest />
			<EnvTest />
		</div>
	)
}
