import { Box, Text } from "ink"
import React, { useEffect } from "react"
import { useCycle } from "./useCycle"

interface LoadingSpinnerProps {
	message: string
}

export default function LoadingSpinner({
	message,
}: LoadingSpinnerProps): JSX.Element {
	const [symbol, cycle] = useCycle("/", "-", "\\")

	useEffect(() => {
		const interval = setInterval(cycle, 50)

		return () => clearInterval(interval)
	}, [cycle])

	return (
		<Box marginX={2} marginY={1}>
			<Text color="blueBright">{symbol}</Text>
			<Box marginLeft={4}>
				<Text color="blueBright">{message}</Text>
			</Box>
		</Box>
	)
}
