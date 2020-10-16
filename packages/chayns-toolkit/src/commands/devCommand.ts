import WebpackDevServer from "webpack-dev-server"
import { createWebpackCompiler } from "../util/createWebpackCompiler"
import { getDevServerOptions } from "../util/getDevServerOptions"
import { output } from "../util/output"
import { StepParams } from "../util/runSteps"

export function devCommand({ config, packageJson }: StepParams): void {
	process.env.BABEL_ENV = "development"
	process.env.NODE_ENV = "development"

	const { port, host, cert, key } = config.development

	const devServer = new WebpackDevServer(
		createWebpackCompiler({
			analyze: false,
			mode: "development",
			outputFilename: config.output.filename,
			singleBundle: config.output.singleBundle,
			packageJson,
		}),
		getDevServerOptions({ host, port, cert, key })
	)

	devServer.listen(port, host, (err) => {
		if (err) output.error(err.message)
	})
}
