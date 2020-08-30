import { Text } from "ink"
import React, { useEffect, useState } from "react"
import WebpackDevServer from "webpack-dev-server"
import Card from "../components/Card"
import { createWebpackCompiler } from "../util/createWebpackCompiler"
import { loadConfig } from "../util/loadConfig"

export default function Dev() {
	const [configError, setConfigError] = useState<Error>()

	useEffect(() => {
		;(async () => {
			try {
				const config = await loadConfig()

				const hasHttpsCertificates = Boolean(
					config.https?.cert && config.https?.key
				)

				const devServer = new WebpackDevServer(
					createWebpackCompiler({ mode: "development" }),
					{
						historyApiFallback: true,
						compress: true,
						disableHostCheck: true,
						// @ts-expect-error
						cert: hasHttpsCertificates ? config.https?.cert : undefined,
						key: hasHttpsCertificates ? config.https?.key : undefined,
						https: hasHttpsCertificates,
						hot: true,
						headers: {
							"Access-Control-Allow-Origin": "*",
							"Access-Control-Allow-Methods":
								"GET, POST, PUT, DELETE, PATCH, OPTIONS",
							"Access-Control-Allow-Headers":
								"X-Requested-With, content-type, Authorization",
						},
					}
				)

				devServer.listen(
					config.port || DEFAULT_PORT,
					config.host ||
						(hasHttpsCertificates ? DEFAULT_HTTPS_HOSTNAME : DEFAULT_HOSTNAME),
					(err) => {
						if (err) console.error(err)
					}
				)
			} catch (e) {
				setConfigError(e)
			}
		})()
	}, [])

	if (configError) {
		return (
			<Card icon="!" color="redBright">
				<Text>{configError.message}</Text>
			</Card>
		)
	}

	return null
}

const DEFAULT_PORT = 1234
const DEFAULT_HOSTNAME = "localhost"
const DEFAULT_HTTPS_HOSTNAME = "0.0.0.0"
