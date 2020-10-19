import type { JsonValue } from "type-fest"
import * as yup from "yup"
import { project } from "../../util/project"
import { configSchema, ToolkitConfig } from "./configSchema"

export async function loadConfig(): Promise<ToolkitConfig> {
	let config: unknown = {}

	if (project.hasFile(JS_CONFIG_FILENAME)) {
		config = await import(project.resolvePath(JS_CONFIG_FILENAME))
	} else if (project.hasFile(JSON_CONFIG_FILENAME)) {
		const configString = (await project.readFile(JSON_CONFIG_FILENAME)) ?? "{}"

		config = JSON.parse(configString) as JsonValue
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

export const JSON_CONFIG_FILENAME = "chayns-toolkit.json"
export const JS_CONFIG_FILENAME = "toolkit.config.js"
