import { Box, Text } from "ink"
import React, { useEffect, useState } from "react"
import WebpackDevServer from "webpack-dev-server"
import Badge from "../components/Badge"
import ConfigError from "../components/ConfigError"
import LoadingMessage from "../components/LoadingMessage"
import StatusMessage from "../components/StatusMessage"
import { useConfig } from "../features/config-file/useConfig"
import { createWebpackCompiler } from "../util/createWebpackCompiler"
import { getDevServerOptions } from "../util/getDevServerOptions"

export default function Dev(): JSX.Element {
	const [errorMessage, setErrorMessage] = useState<string>()
	const [config, configError] = useConfig()

	useEffect(() => {
		if (config) {
			process.env.BABEL_ENV = "development"
			process.env.NODE_ENV = "development"

			const hasHttpsCertificates = Boolean(
				config.development.cert && config.development.key
			)

			const port = config.development.port || DEFAULT_PORT
			let { host } = config.development

			if (host === "adaptive") {
				host = hasHttpsCertificates ? DEFAULT_HTTPS_HOSTNAME : DEFAULT_HOSTNAME
			}

			const devServer = new WebpackDevServer(
				createWebpackCompiler({
					analyze: false,
					mode: "development",
					outputFilename: config.output.filename,
					singleBundle: config.output.singleBundle,
				}),
				getDevServerOptions({
					host,
					port,
					cert: config.development.cert,
					key: config.development.key,
				})
			)

			devServer.listen(port, host, (err) => {
				if (err) setErrorMessage(err.message)
			})
		}
	}, [config])

	if (configError) {
		return <ConfigError message={configError.message} />
	}

	if (errorMessage) {
		return (
			<>
				<StatusMessage badge={<Badge color="redBright">Error</Badge>}>
					Failed to start development server.
				</StatusMessage>
				<Box marginBottom={1}>
					<Text>{errorMessage}</Text>
				</Box>
			</>
		)
	}

	if (!config) {
		return <LoadingMessage>Loading configuration file...</LoadingMessage>
	}

	return <></>
}

const DEFAULT_PORT = 1234
const DEFAULT_HOSTNAME = "localhost"
const DEFAULT_HTTPS_HOSTNAME = "0.0.0.0"
