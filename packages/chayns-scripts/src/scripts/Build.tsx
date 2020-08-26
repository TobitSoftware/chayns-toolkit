import { Text } from "ink"
import React, { useEffect } from "react"
import webpack from "webpack"
import { createConfig } from "../webpack/config"

export default function Build() {
	useEffect(() => {
		const compiler = webpack(createConfig({ mode: "production" }))

		compiler.run((err, stats) => {
			if (err || stats.hasErrors()) {
				console.error(err || stats)
			}
		})
	}, [])

	return <Text>Build lol</Text>
}
