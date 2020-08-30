import { Box, Text } from "ink"
import Spinner from "ink-spinner"
import React, { useEffect, useState } from "react"
import { Stats } from "webpack"
import AssetSize from "../components/build/AssetSize"
import SizeIndicator from "../components/build/SizeIndicator"
import Card from "../components/Card"
import Column from "../components/grid/Column"
import GridItem from "../components/grid/GridItem"
import { createWebpackCompiler } from "../util/createWebpackCompiler"

export default function Build() {
	const [buildResults, setBuildResults] = useState<Stats>()

	useEffect(() => {
		const compiler = createWebpackCompiler({ mode: "production" })

		compiler.run((err, stats) => {
			setBuildResults(stats)

			if (err || stats.hasErrors()) {
				console.error(err || stats)
			}
		})
	}, [])

	if (!buildResults) {
		return (
			<Text>
				<Text color="greenBright">
					<Spinner type="dots" />
				</Text>{" "}
				<Text>{"I'm bundling your code..."}</Text>
			</Text>
		)
	}

	const assets = buildResults.toJson().assets

	return (
		<Box flexDirection="column" alignItems="flex-start">
			<Card color="greenBright" icon="✓">
				<Text>Got it! These are your output files:</Text>
			</Card>
			<Box marginBottom={1}>
				<Column>
					{assets?.map((asset, index) => (
						<SizeIndicator key={index} asset={asset} />
					))}
				</Column>
				<Column>
					{assets?.map((asset, index) => (
						<GridItem key={index}>
							<Text>{asset.name}</Text>
						</GridItem>
					))}
				</Column>
				<Column alignment="end">
					{assets?.map((asset, index) => (
						<AssetSize key={index} asset={asset}></AssetSize>
					))}
				</Column>
			</Box>
		</Box>
	)
}
