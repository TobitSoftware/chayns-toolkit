import { createRsbuild } from "@rsbuild/core"
import { createWebpackConfig } from "../util/createWebpackConfig"
import { modifyWebpackConfig, WebpackModifierFunction } from "../util/modifyWebpackConfig"
import { output } from "../util/output"
import { StepParams } from "../util/runSteps"
import { runCompiler } from "../util/webpackPromises"

interface BuildOptions {
	analyze: boolean
	watch: boolean
}

export function buildCommand({
	analyze,
	watch,
}: BuildOptions): (stepParams: StepParams) => Promise<void> {
	return async ({ config, packageJson }) => {
		let webpackConfig = await createWebpackConfig({
			mode: "production",
			analyze,
			outputFilename: config.output.filename,
			singleBundle: config.output.singleBundle,
			serverSideRendering: config.output.serverSideRendering !== false,
			path: config.output.path,
			packageJson,
			prefixCss: config.output.prefixCss,
			cssVersion: config.output.cssVersion,
			exposeModules: config.output.exposeModules,
			reactRequiredVersions: config.output.reactRequiredVersions,
			disableReactSharing: config.output.disableReactSharing,
			reactRuntime: config.output.reactRuntime,
			reactCompiler: config.output.reactCompiler,
			manifest: config.manifest,
			entryPoints: config.output.entryPoints,
		})

		if (typeof config.webpack === "function") {
			const modifier = config.webpack as WebpackModifierFunction

			webpackConfig = modifyWebpackConfig({
				config: webpackConfig,
				dev: false,
				modifier,
				watch,
			})
		}

		const rsbuild = await createRsbuild({ rsbuildConfig: webpackConfig })

		output.info(`Bundling your code...`)

		const stats = await runCompiler(rsbuild, {
			watch,
		})

		if (stats?.hasErrors()) {
			output.error("Compilation failed.\n")

			const errors =
				"stats" in stats
					? stats.stats.flatMap((s) => s.compilation.errors)
					: stats.compilation.errors

			errors.forEach((error: Error) => {
				console.error(error)
			})
			output.exit(1)
		}
	}
}
