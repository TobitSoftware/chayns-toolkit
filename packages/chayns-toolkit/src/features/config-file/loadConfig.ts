import type { JsonValue } from "type-fest"
import * as yup from "yup"
import { project } from "../../util/project"
import { ChaynsScriptsConfiguration, configSchema } from "./configSchema"

export async function loadConfig(): Promise<ChaynsScriptsConfiguration> {
	const config = (await project.readFile(CONFIG_FILE_NAME)) ?? "{}"

	let parsedConfig

	try {
		parsedConfig = JSON.parse(config.toString()) as JsonValue
	} catch {
		throw Error(`The configuration does not seem to contain valid JSON.`)
	}

	try {
		const validatedValue = await configSchema.validate(parsedConfig)

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

export const CONFIG_FILE_NAME = "chayns-toolkit.json"
