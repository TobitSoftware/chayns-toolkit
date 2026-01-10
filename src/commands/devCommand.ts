import { exec } from "child_process"
import { createRsbuild } from "@rsbuild/core"
import fs, { watchFile } from "fs"
import { unwatchFile } from "node:fs"
import { createWebpackConfig } from "../util/createWebpackConfig"
import { fm } from "../util/format"
import { modifyWebpackConfig, WebpackModifierFunction } from "../util/modifyWebpackConfig"
import { output } from "../util/output"
import { pkgCommands } from "../util/pkgCommands"
import { runSteps, StepParams } from "../util/runSteps"
import { project } from "../util/project"
import { loadEnvironment, resetEnvironment } from "../features/environment/loadEnvironment"
import { checkForTypeScript } from "../features/typescript/checkForTypeScript"
import { checkSSLConfig } from "../features/ssl-check/checkSSLConfig"
import { usedConfigFilename } from "../features/config-file/loadConfig"

interface DevCommandArgs {
	devtools?: boolean
}

export function devCommand({
	devtools,
}: DevCommandArgs): (stepParams: StepParams) => Promise<void> {
	return async ({ config, packageJson, packageManager }) => {
		const { port, ports, host, cert, key } = config.development

		const targets =
			config.output.serverSideRendering === "all"
				? (["server", "client"] as const)
				: ([null] as const)

		const servers: { close: () => Promise<void> }[] = []

		for (const target of targets) {
			let webpackConfig = await createWebpackConfig({
				analyze: false,
				mode: "development" as const,
				outputFilename: config.output.filename,
				singleBundle: config.output.singleBundle,
				serverSideRendering: config.output.serverSideRendering === "all",
				packageJson,
				injectDevtoolsScript: devtools,
				prefixCss: config.output.prefixCss,
				cssVersion: config.output.cssVersion,
				exposeModules: config.output.exposeModules,
				disableReactSharing: config.output.disableReactSharing,
				manifest: config.manifest,
				entryPoints: config.output.entryPoints,
				target,
			})

			if (devtools) {
				if ("react-devtools" in (packageJson.dependencies || {})) {
					output.error(`You added ${fm.code`react-devtools`} as a regular dependency.`)
					output.blank(
						`Install it under ${fm.code`devDependencies`} by running ${pkgCommands.move(
							packageManager,
							"react-devtools",
							"dev",
						)}.\n`,
					)
					process.exit(1)
				} else if (!("react-devtools" in (packageJson.devDependencies || {}))) {
					output.error(
						`You need to install the ${fm.code`react-devtools`} package to use the ${fm.command`--devtools`} option.`,
					)
					output.blank(
						`Run ${pkgCommands.move(
							packageManager,
							"react-devtools",
							"dev",
						)} to add it as a ${fm.code`devDependency`}.\n`,
					)
					process.exit(1)
				}

				const originalEnvPort = process.env.PORT
				process.env.PORT = undefined
				exec(`npx react-devtools`)
				process.env.PORT = originalEnvPort
			}

			webpackConfig.server ||= {}
			webpackConfig.server.host = host
			webpackConfig.server.port = port
			webpackConfig.server.strictPort = config.development.strictPort
			if (config.output.serverSideRendering === "all" && ports) {
				if (target === "server") {
					webpackConfig.server.port = ports.server
				} else {
					webpackConfig.server.port = ports.client
				}
			}
			webpackConfig.server.headers = {
				"Access-Control-Allow-Headers": "Authorization, Content-Type, X-Requested-With",
				"Access-Control-Allow-Private-Network": "true",
			}
			webpackConfig.server.cors = {
				credentials: true,
				origin: true,
			}
			webpackConfig.dev ??= {}
			webpackConfig.dev.lazyCompilation = false

			if (cert && key) {
				webpackConfig.server.https = {
					cert: fs.readFileSync(cert),
					key: fs.readFileSync(key),
				}
			}

			if (typeof config.webpack === "function") {
				const modifier = config.webpack as WebpackModifierFunction

				webpackConfig = modifyWebpackConfig({
					config: webpackConfig,
					dev: true,
					modifier,
					target,
					watch: true,
				})
			}

			const rsbuild = await createRsbuild({ rsbuildConfig: webpackConfig })

			const { server, urls } = await rsbuild.startDevServer()
			servers.push(server)

			urls.forEach((url) => {
				output.info(`Project is running at: ${url}`)
			})
		}

		let closingDevServer = false

		const buildEnv = process.env.BUILD_ENV || "development"
		let watchFileList = [".env", ".env.local", `.env.${buildEnv}`, `.env.${buildEnv}.local`]
		if (usedConfigFilename) {
			watchFileList.unshift(usedConfigFilename)
		}
		Object.values(config.output.entryPoints ?? {}).forEach(({ pathHtml }) => {
			if (pathHtml && !watchFileList.includes(pathHtml)) {
				watchFileList.push(pathHtml)
			}
		})

		watchFileList = watchFileList
			.map((file) => project.resolvePath(file))
			.filter((file) => project.hasFile(file))

		const watchFileFunc = () => {
			if (closingDevServer) return
			closingDevServer = true
			console.log("Restarting dev server")
			void Promise.all(servers.map((server) => server.close())).then(() => {
				resetEnvironment()
				loadEnvironment(true)
				closingDevServer = false
				void runSteps([checkForTypeScript, checkSSLConfig], [devCommand({})])
				watchFileList.forEach((file) => unwatchFile(file, watchFileFunc))
			})
		}

		watchFileList.forEach((file) => {
			output.info(`Watching for file changes of ${fm.path(file)}`)
			watchFile(file, watchFileFunc)
		})
	}
}
