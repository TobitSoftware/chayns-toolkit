import defaultConfigContents from "@parcel/config-default"
import Parcel from "@parcel/core"
import { Text } from "ink"
import path from "path"
import React, { useEffect } from "react"

export default function Build() {
	useEffect(() => {
		const bundler = new Parcel({
			entries: path.resolve(process.cwd(), "./src/index.html"),
			defaultConfig: {
				...defaultConfigContents,
				filePath: require.resolve("@parcel/config-default"),
			},
			env: "production",
			distDir: "build",
			minify: true,
			sourceMaps: true,
			hot: false,
			contentHash: true,
			serve: false,
			defaultEngines: {
				browsers: [">0.2%", "not dead", "not op_mini all"],
			},
		})

		bundler.run()
	}, [])

	return <Text>Build lol</Text>
}
