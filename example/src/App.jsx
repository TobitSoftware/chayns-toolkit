import { Test } from "class-properties-test"
import CorejsTest from "components/corejs-test/CorejsTest"
import CssModules from "components/css-modules/CssModules"
import EnvTest from "components/env-test/EnvTest"
import FileLoaderTest from "components/file-loader-test/FileLoaderTest"
import HmrTest from "components/hmr-test/HmrTest"
import PipelineOperatorTest from "components/pipeline-operator-test/PipelineOperatorTest"
import SvgTest from "components/svg-test/SvgTest"
import TsTest from "components/ts-test/TsTest"
import UrlLoaderTest from "components/url-loader-test/UrlLoaderTest"
import React, { Suspense } from "react"
import "./App.css"

const LazyComponent = React.lazy(() =>
	import("./components/code-splitting-test/CodeSplittingTest")
)

export default function App() {
	console.log(new Test().getTest())

	return (
		<div>
			<CssModules />
			<HmrTest />
			<FileLoaderTest />
			<UrlLoaderTest />
			<SvgTest />
			<TsTest />
			<CorejsTest />
			<EnvTest />
			<Suspense fallback={<div />}>
				<LazyComponent />
			</Suspense>
			<PipelineOperatorTest />
		</div>
	)
}
