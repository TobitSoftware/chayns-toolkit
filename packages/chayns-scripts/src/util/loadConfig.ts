import { readFile } from "fs"
import path from "path"
import { promisify } from "util"
import * as yup from "yup"

const readFileAsync = promisify(readFile)

export interface ChaynsScriptsConfiguration {
	host?: string
	port?: number
	https?: {
		cert: string
		key: string
	}
}

const configSchema = yup
	.object()
	.noUnknown()
	.shape({
		host: yup.string(),
		port: yup.number().integer().positive(),
		https: yup.object().shape({
			cert: yup.string(),
			key: yup.string(),
		}),
	})

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

	try {
		const parsed = JSON.parse(config.toString())

		const isValid = await configSchema.isValid(parsed)

		if (isValid) {
			return parsed as ChaynsScriptsConfiguration
		} else {
			throw Error("")
		}
	} catch {
		throw Error(
			`Invalid configuration detected. Check your \`${CONFIG_FILE_NAME}\` file.`
		)
	}
}

const CONFIG_FILE_NAME = "chayns-scripts.json"
