import { Box, Text } from "ink"
import React, { useEffect, useState } from "react"
import Badge from "../components/Badge"
import LoadingMessage from "../components/LoadingMessage"
import StatusMessage from "../components/StatusMessage"
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
				<StatusMessage badge={<Badge color="red">Error</Badge>}>
					An error occured during linting.
				</StatusMessage>
				<Box marginBottom={1}>
					<Text color="redBright">{lintError.toString()}</Text>
				</Box>
			</>
		)
	}

	if (!lintResults) {
		return <LoadingMessage>Linting your code...</LoadingMessage>
	}

	const { warningCount, errorCount, formattedResults } = lintResults

	if (errorCount === 0 && warningCount === 0) {
		return (
			<StatusMessage badge={<Badge color="green">Success</Badge>}>
				No linting errors were found.
			</StatusMessage>
		)
	}

	return (
		<>
			<StatusMessage badge={<Badge color="yellowBright">Warning</Badge>}>
				<Text color="redBright" bold>
					{errorCount} errors
				</Text>
				<Text> and </Text>
				<Text color="yellowBright" bold>
					{warningCount} warnings
				</Text>
				<Text> found.</Text>
			</StatusMessage>
			<Box marginBottom={1}>
				<Text>{formattedResults}</Text>
			</Box>
		</>
	)
}
