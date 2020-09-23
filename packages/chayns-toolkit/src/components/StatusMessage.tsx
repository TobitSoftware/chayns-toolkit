import { Box, Text } from "ink"
import React from "react"

interface StatusMessageProps {
	badge: React.ReactNode
	children: React.ReactNode | string
}

export default function StatusMessage({
	badge,
	children,
}: StatusMessageProps): JSX.Element {
	return (
		<Box marginBottom={1} flexDirection="row">
			<Box marginRight={1}>{badge}</Box>
			<Box flexDirection="row">
				{typeof children === "string" ? <Text>{children}</Text> : children}
			</Box>
		</Box>
	)
}
