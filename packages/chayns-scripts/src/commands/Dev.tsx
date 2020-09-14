import { Box, Text } from "ink"
import React, { useEffect, useState } from "react"
import WebpackDevServer from "webpack-dev-server"
import Badge from "../components/Badge"
import LoadingMessage from "../components/LoadingMessage"
import StatusMessage from "../components/StatusMessage"
import { CONFIG_FILE_NAME } from "../features/config/loadConfig"
import { useConfig } from "../features/config/useConfig"
import { createWebpackCompiler } from "../util/createWebpackCompiler"
import { getDevServerOptions } from "../util/getDevServerOptions"

export default function Dev(): JSX.Element {
	const [errorMessage, setErrorMessage] = useState<string>()
	const [config, configError] = useConfig()

	useEffect(
		function startWebpackDevServer() {
			if (config) {
				process.env.BABEL_ENV = "development"
				process.env.NODE_ENV = "development"

				const hasHttpsCertificates = Boolean(
					config.development?.cert && config.development?.key
				)

				const host =
					config.development?.host ||
					(hasHttpsCertificates ? DEFAULT_HTTPS_HOSTNAME : DEFAULT_HOSTNAME)
				const port = config.development?.port || DEFAULT_PORT

				const devServer = new WebpackDevServer(
					createWebpackCompiler({ mode: "development" }),
					getDevServerOptions({
						host,
						port,
						cert: config.development?.key,
						key: config.development?.key,
					})
				)

				devServer.listen(port, host, (err) => {
					if (err) setErrorMessage(err.message)
				})
			}
		},
		[config]
	)

	if (configError) {
		return (
			<>
				<StatusMessage badge={<Badge color="redBright">Error</Badge>}>
					Invalid configuration file detected.
				</StatusMessage>
				<Box marginBottom={1}>
					<Text>{configError.message}</Text>
				</Box>
				<Box marginBottom={1}>
					<Text color="blueBright">
						Check your \`${CONFIG_FILE_NAME}\` file.
					</Text>
				</Box>
			</>
		)
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

	return <LoadingMessage>Loading configuration file...</LoadingMessage>
}

const DEFAULT_PORT = 1234
const DEFAULT_HOSTNAME = "localhost"
const DEFAULT_HTTPS_HOSTNAME = "0.0.0.0"
