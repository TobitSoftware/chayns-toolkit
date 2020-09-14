import { readFile } from "fs"
import path from "path"
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
		return {}
	}

	let parsedConfig

	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		parsedConfig = JSON.parse(config.toString())
	} catch {
		throw Error(
			`Your \`${CONFIG_FILE_NAME}\` file does not seem to contain valid JSON.`
		)
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

export const CONFIG_FILE_NAME = "chayns-scripts.json"
