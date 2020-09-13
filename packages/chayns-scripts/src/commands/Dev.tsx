import { Box, Text } from "ink"
import React, { useEffect, useState } from "react"
import WebpackDevServer from "webpack-dev-server"
import Badge from "../components/Badge"
import { createWebpackCompiler } from "../util/createWebpackCompiler"
import { getDevServerOptions } from "../util/getDevServerOptions"
import { loadConfig } from "../util/loadConfig"

export default function Dev(): JSX.Element {
	const [errorMessage, setErrorMessage] = useState<string>()

	useEffect(() => {
		process.env.BABEL_ENV = "development"
		process.env.NODE_ENV = "development"

		loadConfig()
			.then((config) => {
				const hasHttpsCertificates = Boolean(
					config.https?.cert && config.https?.key
				)

				const host =
					config.host ||
					(hasHttpsCertificates ? DEFAULT_HTTPS_HOSTNAME : DEFAULT_HOSTNAME)
				const port = config.port || DEFAULT_PORT

				const devServer = new WebpackDevServer(
					createWebpackCompiler({ mode: "development" }),
					getDevServerOptions({
						host,
						port,
						cert: config.https?.key,
						key: config.https?.key,
					})
				)

				devServer.listen(port, host, (err) => {
					if (err) setErrorMessage(err.message)
				})
			})
			.catch((e: Error) => setErrorMessage(e.message))
	}, [])

	if (errorMessage) {
		return (
			<>
				<Box marginBottom={1}>
					<Box marginRight={1}>
						<Badge color="green">Error</Badge>
					</Box>
					<Text>Failed to start development server.</Text>
				</Box>
				<Box marginBottom={1}>
					<Text>{errorMessage}</Text>
				</Box>
			</>
		)
	}

	return <></>
}

const DEFAULT_PORT = 1234
const DEFAULT_HOSTNAME = "localhost"
const DEFAULT_HTTPS_HOSTNAME = "0.0.0.0"
