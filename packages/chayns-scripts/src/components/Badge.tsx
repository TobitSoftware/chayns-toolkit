import { Text, TextProps } from "ink"
import React from "react"

interface BadgeProps {
	children: string
	color: TextProps["color"]
}

export default function Badge({ children, color }: BadgeProps): JSX.Element {
	return <Text color={color} inverse bold>{` ${children.toUpperCase()} `}</Text>
}
