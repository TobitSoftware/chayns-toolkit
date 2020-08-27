import path from "path"
import { useEffect } from "react"
import webpack from "webpack"
import WebpackDevServer from "webpack-dev-server"
import { createConfig } from "../webpack/config"

const packageFile = require(path.resolve(process.cwd(), "package.json"))

export default function Dev() {
	useEffect(() => {
		const certs = packageFile.chayns?.https
		const hasHttpsCertificates = Boolean(certs?.cert && certs?.key)

		const devServer = new WebpackDevServer(
			webpack(createConfig({ mode: "development" })),
			{
				historyApiFallback: true,
				compress: true,
				disableHostCheck: true,
				// @ts-expect-error
				cert: hasHttpsCertificates ? certs.cert : undefined,
				key: hasHttpsCertificates ? certs.key : undefined,
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
			1234,
			hasHttpsCertificates ? "0.0.0.0" : "localhost",
			(err) => {
				if (err) {
					console.error(err)
				}
			}
		)
	}, [])

	return null
}
