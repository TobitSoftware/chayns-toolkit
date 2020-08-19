import defaultConfigContents from "@parcel/config-default"
import Parcel from "@parcel/core"
import { Text } from "ink"
import path from "path"
import React, { useEffect } from "react"

const packageFile = require(path.resolve(process.cwd(), "package.json"))

export default function Dev() {
	useEffect(() => {
		const bundler = new Parcel({
			entries: path.resolve(process.cwd(), "./src/index.html"),
			defaultConfig: {
				...defaultConfigContents,
				filePath: require.resolve("@parcel/config-default"),
			},
			env: "development",
			disableCache: true,
			minify: false,
			distDir: "build",
			sourceMaps: true,
			hot: true,
			serve: {
				host: "0.0.0.0",
				port: 1234,
				https: packageFile.chayns.https,
			},
			defaultEngines: {
				browsers: [
					"latest 1 chrome version",
					"latest 1 firefox version",
					"latest 1 safari version",
				],
			},
		})

		bundler.watch()
	}, [])

	return <Text>Dev running.</Text>
}
