import { Box } from "ink"
import React, { ReactNode } from "react"

interface GridItemProps {
	children: ReactNode
}

export default function GridItem({ children }: GridItemProps): JSX.Element {
	return <Box>{children}</Box>
}
