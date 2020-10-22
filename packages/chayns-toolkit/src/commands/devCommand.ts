import { exec } from "child_process"
import * as path from "path"
import webpack from "webpack"
import WebpackDevServer from "webpack-dev-server"
import { createWebpackConfig } from "../util/createWebpackConfig"
import {
	modifyWebpackConfig,
	WebpackModifierFunction,
} from "../util/modifyWebpackConfig"
import { output } from "../util/output"
import { StepParams } from "../util/runSteps"

interface DevCommandArgs {
	devtools: boolean
}

export function devCommand({
	devtools,
}: DevCommandArgs): (stepParams: StepParams) => Promise<void> {
	return async ({ config, packageJson }) => {
		process.env.BABEL_ENV = "development"
		process.env.NODE_ENV = "development"

		const { port, host, cert, key } = config.development

		let webpackConfig = await createWebpackConfig({
			analyze: false,
			mode: "development",
			outputFilename: config.output.filename,
			singleBundle: config.output.singleBundle,
			packageJson,
			injectDevtoolsScript: devtools,
		})

		if (typeof config.webpack === "function") {
			const modifier = config.webpack as WebpackModifierFunction

			webpackConfig = modifyWebpackConfig({
				config: webpackConfig,
				dev: true,
				modifier,
			})
		}

		if (devtools) {
			exec(`node ${path.join(require.resolve("react-devtools"), "../bin.js")}`)
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
				"Access-Control-Allow-Methods":
					"GET, POST, PUT, DELETE, PATCH, OPTIONS",
				"Access-Control-Allow-Headers":
					"X-Requested-With, content-type, Authorization",
			},
		})

		devServer.listen(port, host, (err) => {
			if (err) output.error(err.message)
		})
	}
}
