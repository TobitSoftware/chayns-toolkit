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
		const targets = config.output.serverSideRendering
			? (["server", "client"] as const)
			: ([null] as const)

		for (const target of targets) {
			// eslint-disable-next-line no-await-in-loop
			let webpackConfig = await createWebpackConfig({
				mode: "production",
				analyze,
				outputFilename: config.output.filename,
				singleBundle: config.output.singleBundle,
				serverSideRendering: config.output.serverSideRendering !== false,
				path: target ? `${config.output.path}/${target}` : config.output.path,
				packageJson,
				prefixCss: config.output.prefixCss,
				cssVersion: config.output.cssVersion,
				exposeModules: config.output.exposeModules,
				entryPoints: config.output.entryPoints,
				target,
			})

			if (typeof config.webpack === "function") {
				const modifier = config.webpack as WebpackModifierFunction

				webpackConfig = modifyWebpackConfig({
					config: webpackConfig,
					dev: false,
					modifier,
					target: target ?? "client",
				})
			}

			// eslint-disable-next-line no-await-in-loop
			const rsbuild = await createRsbuild({ rsbuildConfig: webpackConfig })

			output.info(`Bundling your code...`)

			// eslint-disable-next-line no-await-in-loop
			const stats = await runCompiler(rsbuild)

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
}
