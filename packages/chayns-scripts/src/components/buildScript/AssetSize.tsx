import { Text } from "ink"
import React from "react"
import GridItem from "../grid/GridItem"

interface AssetSizeProps {
	asset: Asset
}

export default function AssetSize({ asset }: AssetSizeProps) {
	let unit = "By"
	let amount = asset.size

	if (asset.size > 1_000_000) {
		unit = "MB"
		amount = asset.size / 1_000_000
	} else if (asset.size > 1_000) {
		unit = "KB"
		amount = asset.size / 1_000
	}

	return (
		<GridItem>
			<Text>
				{amount.toLocaleString("en-US", {
					maximumFractionDigits: 2,
				})}
				{` ${unit}`}
			</Text>
		</GridItem>
	)
}
