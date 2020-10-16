import type { Configuration } from "webpack-dev-server"

interface Options {
	host: string
	port: number
	cert?: string
	key?: string
}

export function getDevServerOptions({
	host,
	port,
	cert,
	key,
}: Options): Configuration {
	return {
		historyApiFallback: true,
		compress: true,
		disableHostCheck: true,
		clientLogLevel: "none",
		host,
		port,
		stats: {
			all: false,
			colors: true,
			errors: true,
			warnings: true,
		},
		https: Boolean(cert && key) && { key, cert },
		hot: true,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers":
				"X-Requested-With, content-type, Authorization",
		},
	}
}
