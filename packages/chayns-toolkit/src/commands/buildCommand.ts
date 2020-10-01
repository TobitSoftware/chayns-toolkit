import chalk from "chalk"
import Table from "cli-table"
import { ChaynsScriptsConfiguration } from "../features/config-file/configSchema"
import { createWebpackCompiler } from "../util/createWebpackCompiler"
import { fm } from "../util/format"
import { output } from "../util/output"

interface BuildOptions {
	config: ChaynsScriptsConfiguration
	analyze: boolean
}

export function buildCommand({ config, analyze }: BuildOptions): Promise<void> {
	return new Promise((resolve, reject) => {
		process.env.BABEL_ENV = "production"
		process.env.NODE_ENV = "production"

		const compiler = createWebpackCompiler({
			mode: "production",
			analyze,
			outputFilename: config.output.filename,
			singleBundle: config.output.singleBundle,
		})

		const startTime = Date.now()

		output.info(`Bundling your code...`)

		compiler.run((err, stats) => {
			const buildTime = (Date.now() - startTime) / 1000
			if (err) reject(err)

			const hasErrors = stats.hasErrors()

			if (hasErrors) {
				output.error("Compilation failed.\n")

				stats.compilation.errors.forEach((error: Error) => {
					console.info(error.message)
				})
				resolve()
			} else {
				const { assets } = stats.toJson()

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

					resolve()
				}
			}
		})
	})
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
