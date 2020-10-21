import webpack from "webpack"
import WebpackDevServer from "webpack-dev-server"
import { createWebpackConfig } from "../util/createWebpackConfig"
import {
	modifyWebpackConfig,
	WebpackModifierFunction,
} from "../util/modifyWebpackConfig"
import { output } from "../util/output"
import { StepParams } from "../util/runSteps"

export function devCommand({ config, packageJson }: StepParams): void {
	process.env.BABEL_ENV = "development"
	process.env.NODE_ENV = "development"

	const { port, host, cert, key } = config.development

	let webpackConfig = createWebpackConfig({
		analyze: false,
		mode: "development",
		outputFilename: config.output.filename,
		singleBundle: config.output.singleBundle,
		packageJson,
	})

	if (typeof config.webpack === "function") {
		const modifier = config.webpack as WebpackModifierFunction

		webpackConfig = modifyWebpackConfig({
			config: webpackConfig,
			dev: true,
			modifier,
		})
	}

	const compiler = webpack(webpackConfig)

	const devServer = new WebpackDevServer(compiler, {
		historyApiFallback: true,
		compress: true,
		disableHostCheck: true,
		clientLogLevel: "none",
		host,
		port,
		stats: { all: false, colors: true, errors: true, warnings: true },
		https: Boolean(cert && key) && { key, cert },
		hot: true,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers":
				"X-Requested-With, content-type, Authorization",
		},
	})

	devServer.listen(port, host, (err) => {
		if (err) output.error(err.message)
	})
}
