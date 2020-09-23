import { Text } from "ink"
import React from "react"
import GridItem from "../grid/GridItem"
import type { Asset } from "./asset"

interface SizeIndicatorProps {
	asset: Asset
}

export default function SizeIndicator({
	asset,
}: SizeIndicatorProps): JSX.Element {
	let symbol = " "
	let color = "yellow"

	if (asset.size > 500_000) {
		symbol = "!"
	}

	if (asset.size > 1_000_000) {
		color = "redBright"
	}

	return (
		<GridItem>
			<Text color={color}>{symbol}</Text>
		</GridItem>
	)
}
