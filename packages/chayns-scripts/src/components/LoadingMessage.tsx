import { Box, Text } from "ink"
import Spinner from "ink-spinner"
import React from "react"

interface LoadingMessageProps {
	children: React.ReactNode | string
}

export default function LoadingMessage({
	children,
}: LoadingMessageProps): JSX.Element {
	return (
		<Box marginBottom={1}>
			<Box marginRight={3}>
				<Text color="greenBright">
					<Spinner type="dots" />
				</Text>
			</Box>
			{typeof children === "string" ? <Text>{children}</Text> : children}
		</Box>
	)
}
