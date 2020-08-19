import { ESLint } from "eslint"
import { Box, Text } from "ink"
import React, { useEffect, useState } from "react"
import LoadingSpinner from "../components/LoadingSpinner"

export default function Lint() {
	const [lintResults, setLintResults] = useState<string>()
	const [lintError, setLintError] = useState()

	useEffect(() => {
		;(async () => {
			try {
				const eslint = new ESLint({ fix: true, extensions: ["js", "jsx"] })

				const results = await eslint.lintFiles(["src/*"])

				await ESLint.outputFixes(results)

				const formatter = await eslint.loadFormatter("stylish")
				const resultText = formatter.format(results)

				setLintResults(resultText)
			} catch (e) {
				setLintError(e)
			}
		})()
	}, [])

	if (lintError) {
		return <Text color="redBright">{lintError}</Text>
	}

	if (!lintResults) {
		return <LoadingSpinner message="Linting your code..." />
	}

	return (
		<Box marginY={1} marginX={2}>
			<Text>{lintResults}</Text>
		</Box>
	)
}
