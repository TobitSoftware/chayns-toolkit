import { Text } from "ink"
import { ParsedArgs } from "minimist"
import React from "react"
import Card from "./components/Card"
import Build from "./scripts/Build"
import Dev from "./scripts/Dev"
import Lint from "./scripts/Lint"

interface AppProps {
	command: string
	args: ParsedArgs
}

export default function App({ command, args }: AppProps): JSX.Element {
	switch (command) {
		case "build":
			return <Build args={args} />
		case "dev":
			return <Dev args={args} />
		case "lint":
			return <Lint args={args} />
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
