import * as yup from "yup"
import { project } from "../../util/project"
import { configSchema, ToolkitConfig } from "./configSchema"

export async function loadConfig(): Promise<ToolkitConfig> {
	let config: unknown = {}

	if (project.hasFile(JS_CONFIG_FILENAME)) {
		config = (await import("file://" + project.resolvePath(JS_CONFIG_FILENAME))).default
	}

	try {
		const validatedValue = await configSchema.validate(config)

		const { host, cert, key } = validatedValue.development

		if (host === "adaptive") {
			const https = Boolean(cert && key)

			validatedValue.development.host = https ? "0.0.0.0" : "localhost"
		}

		return validatedValue
	} catch (error: unknown) {
		console.error(error)
		const validationError = error as yup.ValidationError

		let errorMessage = ""

		if (validationError.errors.length) {
			validationError.errors.forEach((message) => {
				errorMessage += `- ${message}\n`
			})
		}

		throw Error(errorMessage)
	}
}

export const JS_CONFIG_FILENAME = "toolkit.config.js"
