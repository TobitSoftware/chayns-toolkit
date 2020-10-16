import { readFile } from "fs"
import path from "path"
import type { JsonValue } from "type-fest"
import { promisify } from "util"
import * as yup from "yup"
import { ChaynsScriptsConfiguration, configSchema } from "./configSchema"

const readFileAsync = promisify(readFile)

export async function loadConfig(): Promise<ChaynsScriptsConfiguration> {
	let config: string

	try {
		config = await readFileAsync(
			path.resolve(process.cwd(), CONFIG_FILE_NAME),
			{ encoding: "utf8" }
		)
	} catch {
		config = "{}"
	}

	let parsedConfig

	try {
		parsedConfig = JSON.parse(config.toString()) as JsonValue
	} catch {
		throw Error(`The configuration does not seem to contain valid JSON.`)
	}

	try {
		const validatedValue = await configSchema.validate(parsedConfig)

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
