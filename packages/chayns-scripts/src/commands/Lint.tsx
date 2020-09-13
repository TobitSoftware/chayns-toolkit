import { Box, Text } from "ink"
import Spinner from "ink-spinner"
import React, { useEffect, useState } from "react"
import Badge from "../components/Badge"
import {
	collectLintingResults,
	LintingResults,
} from "../util/collectLintingResults"

export default function Lint(): JSX.Element {
	const [lintResults, setLintResults] = useState<LintingResults>()
	const [lintError, setLintError] = useState<Error>()

	useEffect(function startLinting() {
		collectLintingResults().then(setLintResults).catch(setLintError)
	}, [])

	if (lintError) {
		return (
			<>
				<Box marginBottom={1}>
					<Box marginRight={1}>
						<Badge color="red">Error</Badge>
					</Box>
					<Text>An error occured during linting.</Text>
				</Box>
				<Box marginBottom={1}>
					<Text color="redBright">{lintError.toString()}</Text>
				</Box>
			</>
		)
	}

	if (!lintResults) {
		return (
			<Box marginBottom={1}>
				<Box marginRight={3}>
					<Text color="greenBright">
						<Spinner type="dots" />
					</Text>
				</Box>
				<Text>Linting your code...</Text>
			</Box>
		)
	}

	const { warningCount, errorCount, formattedResults } = lintResults

	if (errorCount === 0 && warningCount === 0) {
		return (
			<Box marginBottom={1}>
				<Box marginRight={1}>
					<Badge color="green">Success</Badge>
				</Box>
				<Text>No linting errors were found.</Text>
			</Box>
		)
	}

	return (
		<>
			<Box marginBottom={1}>
				<Box marginRight={1}>
					<Badge color="yellowBright">Warning</Badge>
				</Box>
				<Text color="redBright" bold>
					{errorCount} errors
				</Text>
				<Text> and </Text>
				<Text color="yellowBright" bold>
					{warningCount} warnings
				</Text>
				<Text> found.</Text>
			</Box>
			<Box marginBottom={1}>
				<Text>{formattedResults}</Text>
			</Box>
		</>
	)
}
