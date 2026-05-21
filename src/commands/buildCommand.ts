import { createRsbuild } from "@rsbuild/core"
import fs from "fs"
import { createWebpackConfig } from "../util/createWebpackConfig"
import { createExecController } from "../util/execController"
import { modifyWebpackConfig, WebpackModifierFunction } from "../util/modifyWebpackConfig"
import { output } from "../util/output"
import { StepParams } from "../util/runSteps"
import { runCompiler } from "../util/webpackPromises"

interface BuildOptions {
	analyze: boolean
	exec?: string
	preview: boolean
	watch: boolean
}

export function buildCommand({
	analyze,
	exec,
	preview,
	watch,
}: BuildOptions): (stepParams: StepParams) => Promise<void> {
	return async ({ config, packageJson }) => {
		const execController = createExecController(exec)

		const startPreviewServer = async (rsbuild: Awaited<ReturnType<typeof createRsbuild>>) => {
			const { urls } = await rsbuild.preview()

			urls.forEach((url) => {
				output.info(`Preview is running at: ${url}`)
			})
		}

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

		if (preview) {
			const { port, host, cert, key, strictPort } = config.development

			webpackConfig.server ||= {}
			webpackConfig.server.host = host
			webpackConfig.server.port = port
			webpackConfig.server.strictPort = strictPort
			webpackConfig.server.headers = {
				"Access-Control-Allow-Headers": "Authorization, Content-Type, X-Requested-With",
				"Access-Control-Allow-Private-Network": "true",
			}
			webpackConfig.server.cors = {
				credentials: true,
				origin: true,
			}
			webpackConfig.server.htmlFallback = false

			if (cert && key) {
				webpackConfig.server.https = {
					cert: fs.readFileSync(cert),
					key: fs.readFileSync(key),
				}
			}
		}

		const rsbuild = await createRsbuild({ rsbuildConfig: webpackConfig })
		let waitForPreviewStart: Promise<void> | undefined

		if (exec) {
			rsbuild.onAfterBuild(async ({ stats }) => {
				if (!stats || stats.hasErrors()) {
					return
				}

				await execController.start()
			})

			rsbuild.onCloseBuild(async () => {
				await execController.stop()
			})

			process.once("exit", () => {
				execController.kill()
			})
		}

		if (preview && watch) {
			let previewStarted = false
			waitForPreviewStart = new Promise((resolve, reject) => {
				rsbuild.onAfterBuild(async ({ stats }) => {
					if (previewStarted || !stats || stats.hasErrors()) {
						return
					}

					previewStarted = true

					try {
						await startPreviewServer(rsbuild)
						resolve()
					} catch (error) {
						reject(error instanceof Error ? error : new Error(String(error)))
					}
				})
			})
		}

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

		if (preview) {
			if (watch) {
				await waitForPreviewStart
			} else {
				await startPreviewServer(rsbuild)
			}
		}
	}
}
