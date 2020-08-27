import { Box } from "ink"
import React, { ReactNode } from "react"

interface ColumnProps {
	children: ReactNode
	alignment?: "start" | "end"
}

export default function Column({ children, alignment = "start" }: ColumnProps) {
	let boxAlignment: "flex-start" | "flex-end"

	switch (alignment) {
		case "start":
			boxAlignment = "flex-start"
			break
		case "end":
			boxAlignment = "flex-end"
			break
	}

	return (
		<Box flexDirection="column" marginRight={4} alignItems={boxAlignment}>
			{children}
		</Box>
	)
}
