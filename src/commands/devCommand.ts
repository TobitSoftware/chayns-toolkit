import { exec } from "child_process"
import * as path from "path"
import webpack, { Configuration, web } from "webpack"
import WebpackDevServer from "webpack-dev-server"
import { createWebpackConfig } from "../util/createWebpackConfig"
import { fm } from "../util/format"
import { modifyWebpackConfig, WebpackModifierFunction } from "../util/modifyWebpackConfig"
import { output } from "../util/output"
import { pkgCommands } from "../util/pkgCommands"
import { StepParams } from "../util/runSteps"
import { loadCss } from "../util/loadChaynsCss"
import { project } from "../util/project"

interface DevCommandArgs {
	devtools: boolean
}

export function devCommand({
	devtools,
}: DevCommandArgs): (stepParams: StepParams) => Promise<void> {
	return async ({ config, packageJson, packageManager }) => {
		process.env.BABEL_ENV = "development"
		process.env.NODE_ENV = "development"

		const targets = config.output.serverSideRendering
			? (["server", "client"] as const)
			: ([null] as const)

		const { port, host, cert, key, ports } = config.development

		for (const target of targets) {
			// eslint-disable-next-line no-await-in-loop
			let webpackConfig = await createWebpackConfig({
				analyze: false,
				mode: "development" as const,
				outputFilename: config.output.filename,
				singleBundle: config.output.singleBundle,
				packageJson,
				injectDevtoolsScript: devtools,
				prefixCss: config.output.prefixCss,
				injectCssInPage: config.output.injectCssInPage,
				injectChaynsCss: config.output.injectChaynsCss,
				exposeModules: config.output.exposeModules,
				apiVersion: config.output.apiVersion,
				target,
			})

			if (typeof config.webpack === "function") {
				const modifier = config.webpack as WebpackModifierFunction

				webpackConfig = modifyWebpackConfig({
					config: webpackConfig,
					dev: true,
					modifier,
					target: target ?? "client",
				})
			}

			webpackConfig.plugins = webpackConfig.plugins?.map((webpackPlugin) => {
				if (
					!(
						typeof webpackPlugin === "object" &&
						typeof webpackPlugin.userOptions === "object"
					)
				)
					return webpackPlugin
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				if (webpackPlugin.userOptions?.template) {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access,no-param-reassign
					if (typeof webpackPlugin.userOptions.templateParameters !== "object") {
						// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,no-param-reassign
						webpackPlugin.userOptions.templateParameters = {}
					}
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,no-param-reassign
					webpackPlugin.userOptions.templateParameters.CHAYNS_TOOLKIT_CSS_TAG = `<script>(${loadCss.toString()})()</script>`
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				} else if (webpackPlugin.userOptions?.templateContent) {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,no-param-reassign,@typescript-eslint/no-unsafe-assignment
					webpackPlugin.userOptions.templateContent =
						// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
						webpackPlugin.userOptions.templateContent.replace(
							"<%= CHAYNS_TOOLKIT_CSS_TAG %>",
							`<script>(${loadCss.toString()})()</script>`
						)
				}
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				return webpackPlugin
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

			const compiler = webpack(webpackConfig)

			const baseWebpackDevServerConfig = {
				historyApiFallback: true,
				compress: true,
				allowedHosts: "all",
				host,
				port: target ? (ports ?? { client: 1234, server: 1235 })[target] : port,
				client: {
					logging: "none",
					overlay: false,
				},
				server: {
					type: cert && key ? "https" : "http",
					options: {
						key,
						cert,
					},
				},
				devMiddleware: {
					stats: {
						all: false,
						colors: true,
						errors: true,
						warnings: true,
					},
				},
				hot: true,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
					"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
				},
			}

			const webPackDevServerConfig = modifyWebpackConfig({
				config: baseWebpackDevServerConfig as Configuration,
				dev: true,
				target: target ?? "client",
				modifier: config.webpackDev as WebpackModifierFunction,
			})
			const devServer = new WebpackDevServer(
				webPackDevServerConfig as WebpackDevServer.Configuration,
				compiler
			)

			devServer.startCallback(() => {})
		}
	}
}
