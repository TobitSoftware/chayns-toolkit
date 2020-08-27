import { ESLint } from "eslint"
import { Box, Text } from "ink"
import Spinner from "ink-spinner"
import React, { useEffect, useState } from "react"
import Card from "../components/Card"

export default function Lint() {
	const [lintResults, setLintResults] = useState<string>()
	const [lintError, setLintError] = useState()
	const [success, setSuccess] = useState(false)

	useEffect(() => {
		;(async () => {
			try {
				const eslint = new ESLint({ fix: true, extensions: ["js", "jsx"] })

				const results = await eslint.lintFiles(["./src"])

				await ESLint.outputFixes(results)

				const errorCount = results.reduce(
					(count, file) => count + file.errorCount + file.warningCount,
					0
				)

				if (errorCount > 0) {
					const formatter = await eslint.loadFormatter("stylish")
					const resultText = formatter.format(results)

					setLintResults(resultText)
				} else {
					setSuccess(true)
				}
			} catch (e) {
				setLintError(e)
			}
		})()
	}, [])

	if (lintError) {
		return <Text color="redBright">{lintError}</Text>
	}

	if (success) {
		return (
			<Card icon="✓" color="greenBright">
				<Text>I didn't find any linting errors. Great!</Text>
			</Card>
		)
	}

	if (!lintResults) {
		return (
			<Text>
				<Text color="greenBright">
					<Spinner type="dots" />
				</Text>
				{" Linting your code..."}
			</Text>
		)
	}

	return (
		<Box marginY={1}>
			<Text>{lintResults}</Text>
		</Box>
	)
}
