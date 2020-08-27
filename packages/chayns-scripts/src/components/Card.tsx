import { Box, Text } from "ink"
import { Props } from "ink/build/components/Box"
import React, { ReactNode } from "react"

interface CardProps {
	children: ReactNode
	color?: Props["borderColor"]
	icon?: string
}

export default function Card({
	children,
	color = "greenBright",
	icon = "",
}: CardProps) {
	return (
		<Box flexDirection="column" alignItems="flex-start" marginY={1}>
			<Box borderColor={color} borderStyle="round" paddingX={2}>
				<Box marginRight={2}>
					<Text color={color}>{icon}</Text>
				</Box>
				{children}
			</Box>
		</Box>
	)
}
