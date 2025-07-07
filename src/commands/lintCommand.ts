import { ESLint } from "eslint"
import { output } from "../util/output"
import { existsSync, writeFileSync } from "node:fs"

export async function lintCommand(): Promise<void> {
	output.info(`Linting your code...`)

	try {
		if (
			!existsSync("./eslint.config.js") &&
			!existsSync("./eslint.config.cjs") &&
			!existsSync("./eslint.config.mjs") &&
			!existsSync("./eslint.config.ts") &&
			!existsSync("./eslint.config.cts") &&
			!existsSync("./eslint.config.mts")
		) {
			writeFileSync(
				"./eslint.config.mjs",
				`import config from '@chayns-toolkit/eslint-config';\n\nexport default config;\n`,
			)
		}

		const eslint = new ESLint({
			fix: true,
		})

		const results = await eslint.lintFiles(["./src"])

		await ESLint.outputFixes(results)

		const warningCount = results.reduce((count, file) => count + file.warningCount, 0)
		const errorCount = results.reduce((count, file) => count + file.errorCount, 0)

		let formattedResults = ""

		if (warningCount || errorCount) {
			const formatter = await eslint.loadFormatter("pretty")
			formattedResults = await formatter.format(results)
		}

		if (errorCount + warningCount === 0) {
			output.info(`No linting errors were found.\n`)
		} else {
			output.warn(`${errorCount} errors and ${warningCount} were found:\n`)
			console.log(formattedResults)
		}
	} catch (e: unknown) {
		output.error("An error occured while linting your project:\n")
		output.blank((e as Error).message)
	}
}
