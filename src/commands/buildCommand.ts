import { createRsbuild } from "@rsbuild/core"
import { createWebpackConfig } from "../util/createWebpackConfig"
import { modifyWebpackConfig, WebpackModifierFunction } from "../util/modifyWebpackConfig"
import { output } from "../util/output"
import { StepParams } from "../util/runSteps"
import { runCompiler } from "../util/webpackPromises"

interface BuildOptions {
	analyze: boolean
}

export function buildCommand({ analyze }: BuildOptions): (stepParams: StepParams) => Promise<void> {
	return async ({ config, packageJson }) => {
		let webpackConfig = await createWebpackConfig({
			mode: "production",
			analyze,
			outputFilename: config.output.filename,
			singleBundle: config.output.singleBundle,
			path: config.output.path,
			packageJson,
			prefixCss: config.output.prefixCss,
			exposeModules: config.output.exposeModules,
			apiVersion: config.output.apiVersion,
			entryPoints: config.output.entryPoints,
		})

		if (typeof config.webpack === "function") {
			const modifier = config.webpack as WebpackModifierFunction

			webpackConfig = modifyWebpackConfig({
				config: webpackConfig,
				dev: false,
				modifier,
			})
		}

		const rsbuild = await createRsbuild({ rsbuildConfig: webpackConfig })

		output.info(`Bundling your code...`)

		const stats = await runCompiler(rsbuild)

		if (stats?.hasErrors()) {
			output.error("Compilation failed.\n")

			stats.compilation.errors.forEach((error: Error) => {
				console.error(error)
			})
			output.exit(1)
		}
	}
}
