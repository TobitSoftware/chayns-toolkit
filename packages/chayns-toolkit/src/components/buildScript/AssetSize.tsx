import { Text } from "ink"
import React from "react"
import GridItem from "../grid/GridItem"
import type { Asset } from "./asset"

interface AssetSizeProps {
	asset: Asset
}

export default function AssetSize({ asset }: AssetSizeProps): JSX.Element {
	let unit = "B"
	let amount = asset.size

	if (asset.size > 1_000_000) {
		unit = "mB"
		amount = asset.size / 1_000_000
	} else if (asset.size > 1_000) {
		unit = "kB"
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
