import chalk from "chalk"
import Table from "cli-table"
import dotenv from "dotenv"
import webpack from "webpack"
import { createWebpackConfig } from "../util/createWebpackConfig"
import { fm } from "../util/format"
import { modifyWebpackConfig, WebpackModifierFunction } from "../util/modifyWebpackConfig"
import { output } from "../util/output"
import { StepParams } from "../util/runSteps"
import { closeCompiler, runCompiler } from "../util/webpackPromises"
import { loadCss } from "../util/loadChaynsCss"

interface BuildOptions {
	analyze: boolean
}

export function buildCommand({ analyze }: BuildOptions): (stepParams: StepParams) => Promise<void> {
	return async ({ config, packageJson }) => {
		process.env.BABEL_ENV = "production"
		process.env.NODE_ENV = "production"

		const buildEnv = process.env.BUILD_ENV || "production"

		dotenv.config({ path: `.env.${buildEnv}.local` })
		dotenv.config({ path: `.env.local` })
		dotenv.config({ path: `.env.${buildEnv}` })
		dotenv.config({ path: ".env" })

		let webpackConfig = await createWebpackConfig({
			mode: "production",
			analyze,
			outputFilename: config.output.filename,
			singleBundle: config.output.singleBundle,
			path: config.output.path,
			packageJson,
			prefixCss: config.output.prefixCss,
			injectCssInPage: config.output.injectCssInPage,
			injectChaynsCss: config.output.injectChaynsCss,
			exposeModules: config.output.exposeModules,
			apiVersion: config.output.apiVersion,
		})

		if (typeof config.webpack === "function") {
			const modifier = config.webpack as WebpackModifierFunction

			webpackConfig = modifyWebpackConfig({
				config: webpackConfig,
				dev: false,
				modifier,
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

		const compiler = webpack(webpackConfig)

		const startTime = Date.now()
		output.info(`Bundling your code...`)

		const stats = await runCompiler(compiler)
		const buildTime = (Date.now() - startTime) / 1000

		await closeCompiler(compiler)

		if (stats?.hasErrors()) {
			output.error("Compilation failed.\n")

			stats.compilation.errors.forEach((error: Error) => {
				console.error(error)
			})
			output.exit(1)
		} else {
			const statsJson = stats?.toJson()

			const { assets } = statsJson

			output.info(
				`Finished build in ${fm.number(
					buildTime.toFixed(2)
				)} seconds. These files were emitted:`
			)

			console.info("")

			if (assets) {
				const table = new Table({
					...tableStyles,
					colAligns: ["left", "right"],
				})

				assets.forEach((asset) => {
					let unit = "B"
					let amount = asset.size

					if (asset.size > 1_000_000) {
						unit = "mB"
						amount = asset.size / 1_000_000
					} else if (asset.size > 1_000) {
						unit = "kB"
						amount = asset.size / 1_000
					}

					const size = `${amount.toLocaleString("en-US", {
						maximumFractionDigits: 2,
					})} ${unit}`

					let symbol = " "

					if (asset.size > 500_000) {
						symbol = chalk.yellow("!")
					}

					if (asset.size > 1_000_000) {
						symbol = chalk.redBright("!")
					}

					table.push([asset.name, size, symbol])
				})

				console.info(table.toString())
			}
		}
	}
}

const tableStyles = {
	chars: {
		top: "",
		"top-mid": "",
		"top-left": "",
		"top-right": "",
		bottom: "",
		"bottom-mid": "",
		"bottom-left": "",
		"bottom-right": "",
		left: "",
		"left-mid": "",
		mid: "",
		"mid-mid": "",
		right: "",
		"right-mid": "",
		middle: "   ",
	},
	style: { "padding-left": 0, "padding-right": 0 },
}
