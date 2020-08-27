import { Box } from "ink"
import React, { ReactNode } from "react"

export default function GridItem({ children }: { children: ReactNode }) {
	return <Box marginBottom={1}>{children}</Box>
}
