import { collectLintingResults } from "../util/collectLintingResults"
import { output } from "../util/output"

export async function lintCommand(): Promise<void> {
	output.info(`Linting your code...`)

	try {
		const {
			errorCount,
			formattedResults,
			warningCount,
		} = await collectLintingResults()

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
