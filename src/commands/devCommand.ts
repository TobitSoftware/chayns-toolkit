import { exec } from "child_process"
import * as path from "path"
import { createRsbuild } from "@rsbuild/core"
import fs from "fs"
import { createWebpackConfig } from "../util/createWebpackConfig"
import { fm } from "../util/format"
import { modifyWebpackConfig, WebpackModifierFunction } from "../util/modifyWebpackConfig"
import { output } from "../util/output"
import { pkgCommands } from "../util/pkgCommands"
import { StepParams } from "../util/runSteps"
import { loadCss } from "../util/loadChaynsCss"

interface DevCommandArgs {
	devtools: boolean
}

export function devCommand({
	devtools,
}: DevCommandArgs): (stepParams: StepParams) => Promise<void> {
	return async ({ config, packageJson, packageManager }) => {
		const { port, host, cert, key } = config.development

		let webpackConfig = await createWebpackConfig({
			analyze: false,
			mode: "development" as const,
			outputFilename: config.output.filename,
			singleBundle: config.output.singleBundle,
			packageJson,
			injectDevtoolsScript: devtools,
			prefixCss: config.output.prefixCss,
			exposeModules: config.output.exposeModules,
			entryPoints: config.output.entryPoints,
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

			exec(`node ${path.join(require.resolve("react-devtools"), "../bin.js")}`)
		}

		webpackConfig.server ||= {}
		webpackConfig.server.host = host
		webpackConfig.server.port = port
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
			})
		}

		const rsbuild = await createRsbuild({ rsbuildConfig: webpackConfig })

		rsbuild.startDevServer()
	}
}
