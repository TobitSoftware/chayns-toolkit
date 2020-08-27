import { Text } from "ink"
import React from "react"
import Card from "./components/Card"
import Build from "./scripts/Build"
import Dev from "./scripts/Dev"
import Lint from "./scripts/Lint"

interface AppProps {
	command?: string
}

export default function App({ command }: AppProps): JSX.Element {
	switch (command) {
		case "build":
			return <Build />
		case "dev":
			return <Dev />
		case "lint":
			return <Lint />
	}

	return (
		<Card color="redBright" icon="!">
			<Text>
				I don't know a command that is named{" "}
				<Text color="magentaBright">{command}</Text>.
			</Text>
		</Card>
	)
}
