import { Text } from "ink"
import React from "react"

interface ErrorMessageProps {
	message: string
}

export default function ErrorMessage({
	message,
}: ErrorMessageProps): JSX.Element {
	return <Text color="redBright">{message}</Text>
}
