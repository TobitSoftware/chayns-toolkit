import http from "http"
import https from "https"
import handler from "serve-handler"
import fs from "fs"
import { StepParams } from "../util/runSteps"

export function serveCommand(): (stepParams: StepParams) => Promise<void> {
	return async ({ config }) => {
		const { host, port, cert: certPath, key: keyPath } = config.development

		let cert
		let key
		if (certPath) {
			cert = fs.readFileSync(certPath)
		}
		if (keyPath) {
			key = fs.readFileSync(keyPath)
		}
		const shouldUseHttps = Boolean(cert && key)

		const requestHandler: http.RequestListener = (request, response) => {
			handler(request, response, {
				public: config.output.path ?? "build",
			})
		}

		const server = shouldUseHttps
			? https.createServer(
					{
						key,
						cert,
					},
					requestHandler
			  )
			: http.createServer(requestHandler)

		server.listen(port, () => {
			const url = `http${shouldUseHttps ? "s" : ""}://${host}:${port}`
			console.log(`Running at ${url}`)
		})

		await Promise.resolve()
	}
}
