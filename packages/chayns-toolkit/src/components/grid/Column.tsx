import { Box } from "ink"
import React, { ReactNode } from "react"

interface ColumnProps {
	children: ReactNode
	alignment?: "start" | "end"
}

export default function Column({
	children,
	alignment = "start",
}: ColumnProps): JSX.Element {
	let boxAlignment: "flex-start" | "flex-end" = "flex-start"

	if (alignment === "start") {
		boxAlignment = "flex-start"
	} else if (alignment === "end") {
		boxAlignment = "flex-end"
	}

	return (
		<Box flexDirection="column" marginRight={4} alignItems={boxAlignment}>
			{children}
		</Box>
	)
}
