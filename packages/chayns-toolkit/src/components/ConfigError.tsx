import { Box, Text } from "ink"
import React from "react"
import { CONFIG_FILE_NAME } from "../features/config-file/loadConfig"
import Badge from "./Badge"
import StatusMessage from "./StatusMessage"

interface ConfigErrorProps {
	message: string
}

export default function ConfigError({
	message,
}: ConfigErrorProps): JSX.Element {
	return (
		<>
			<StatusMessage badge={<Badge color="red">Error</Badge>}>
				Invalid configuration file detected.
			</StatusMessage>
			<Box marginBottom={1}>
				<Text>{message}</Text>
			</Box>
			<Box marginBottom={1}>
				<Text>
					Check your <Text color="blueBright">`{CONFIG_FILE_NAME}`</Text> file.
				</Text>
			</Box>
		</>
	)
}
