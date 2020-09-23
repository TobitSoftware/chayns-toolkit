import { ESLint } from "eslint"

export interface LintingResults {
	warningCount: number
	errorCount: number
	formattedResults: string
}

export async function collectLintingResults(): Promise<LintingResults> {
	const eslint = new ESLint({
		fix: true,
		extensions: ["js", "jsx", "ts", "tsx"],
	})

	const results = await eslint.lintFiles(["./src"])

	await ESLint.outputFixes(results)

	const warningCount = results.reduce(
		(count, file) => count + file.warningCount,
		0
	)
	const errorCount = results.reduce((count, file) => count + file.errorCount, 0)

	let formattedResults = ""

	if (warningCount || errorCount) {
		const formatter = await eslint.loadFormatter("pretty")
		formattedResults = formatter.format(results)
	}

	return { errorCount, warningCount, formattedResults }
}
