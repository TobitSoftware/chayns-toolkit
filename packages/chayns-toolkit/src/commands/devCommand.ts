import WebpackDevServer from "webpack-dev-server"
import { createWebpackCompiler } from "../util/createWebpackCompiler"
import { getDevServerOptions } from "../util/getDevServerOptions"
import { output } from "../util/output"
import { StepParams } from "../util/runSteps"

export function devCommand({ config, packageJson }: StepParams): void {
	process.env.BABEL_ENV = "development"
	process.env.NODE_ENV = "development"

	const hasHttpsCertificates = Boolean(
		config.development.cert && config.development.key
	)

	const port = config.development.port || DEFAULT_PORT
	let { host } = config.development

	if (host === "adaptive") {
		host = hasHttpsCertificates ? DEFAULT_HTTPS_HOSTNAME : DEFAULT_HOSTNAME
	}

	const devServer = new WebpackDevServer(
		createWebpackCompiler({
			analyze: false,
			mode: "development",
			outputFilename: config.output.filename,
			singleBundle: config.output.singleBundle,
			packageJson,
		}),
		getDevServerOptions({
			host,
			port,
			cert: config.development.cert,
			key: config.development.key,
		})
	)

	devServer.listen(port, host, (err) => {
		if (err) output.error(err.message)
	})
}

const DEFAULT_PORT = 1234
const DEFAULT_HOSTNAME = "localhost"
const DEFAULT_HTTPS_HOSTNAME = "0.0.0.0"
