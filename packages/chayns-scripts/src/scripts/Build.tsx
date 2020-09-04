import { Box, Text } from "ink"
import Spinner from "ink-spinner"
import React, { useEffect, useState } from "react"
import { Stats } from "webpack"
import AssetSize from "../components/buildScript/AssetSize"
import SizeIndicator from "../components/buildScript/SizeIndicator"
import Card from "../components/Card"
import Column from "../components/grid/Column"
import GridItem from "../components/grid/GridItem"
import { createWebpackCompiler } from "../util/createWebpackCompiler"
import { CommandProps } from "./props"

export default function Build({ args }: CommandProps) {
	const [buildResults, setBuildResults] = useState<Stats>()

	const analyze = Boolean(args.a || args.analyze)

	useEffect(() => {
		process.env.BABEL_ENV = "production"
		process.env.NODE_ENV = "production"

		const compiler = createWebpackCompiler({ mode: "production", analyze })

		compiler.run((err, stats) => {
			setBuildResults(stats)

			if (err) {
				throw err
			}
		})
	}, [])

	if (!buildResults) {
		return (
			<Text>
				<Text color="greenBright">
					<Spinner type="dots" />
				</Text>{" "}
				<Text>I'm bundling your code...</Text>
			</Text>
		)
	}

	const hasErrors = buildResults.hasErrors()

	if (hasErrors) {
		return (
			<Box flexDirection="column">
				<Card color="redBright" icon="!">
					<Text>I encountered some errors while compiling your app!</Text>
				</Card>
				<Box marginY={1} flexDirection="column">
					{buildResults.compilation.errors.map((e, i) => (
						<Text key={i}>{e.error.toString()}</Text>
					))}
				</Box>
			</Box>
		)
	}

	const { assets } = buildResults.toJson()

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
						<AssetSize key={index} asset={asset} />
					))}
				</Column>
			</Box>
		</Box>
	)
}
