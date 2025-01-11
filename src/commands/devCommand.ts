/* eslint-disable no-await-in-loop */
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
							"dev"
						)}.\n`
					)
					process.exit(1)
				} else if (!("react-devtools" in (packageJson.devDependencies || {}))) {
					output.error(
						`You need to install the ${fm.code`react-devtools`} package to use the ${fm.command`--devtools`} option.`
					)
					output.blank(
						`Run ${pkgCommands.move(
							packageManager,
							"react-devtools",
							"dev"
						)} to add it as a ${fm.code`devDependency`}.\n`
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
			if (config.output.serverSideRendering === "all" && ports) {
				if (target === "server") {
					webpackConfig.server.port = ports.server
				} else {
					webpackConfig.server.port = ports.client
				}
			}
			webpackConfig.server.headers = {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
				"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
			}

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
				})
			}

			const rsbuild = await createRsbuild({ rsbuildConfig: webpackConfig })

			const { server, urls } = await rsbuild.startDevServer()

			urls.forEach((url) => {
				console.log("Project is running at: ", url)
			})

			let closingDevServer = false

			const watchFileFunc = () => {
				if (closingDevServer) return
				closingDevServer = true
				console.log("Restarting dev server")
				void server.close().then(() => {
					resetEnvironment()
					loadEnvironment(true)
					closingDevServer = false
					void runSteps([checkForTypeScript, checkSSLConfig], [devCommand({})])
					unwatchFile(project.resolvePath("./toolkit.config.js"), watchFileFunc)
				})
			}

			watchFile(project.resolvePath("./toolkit.config.js"), watchFileFunc)
		}
	}
}
