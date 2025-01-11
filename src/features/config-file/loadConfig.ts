import { ZodError } from "zod"
import { project } from "../../util/project"
import { configSchema, ParsedToolkitConfig, ToolkitConfig } from "./configSchema"

export async function loadConfig(): Promise<ParsedToolkitConfig> {
	let config: ToolkitConfig = {}

	if (project.hasFile(JS_CONFIG_FILENAME)) {
		delete require.cache[project.resolvePath(JS_CONFIG_FILENAME)]
		config = (
			(await import(
				`file://${project.resolvePath(JS_CONFIG_FILENAME)}?update=${Date.now()}`
			)) as {
				default: ToolkitConfig
			}
		).default
	}

	try {
		const validatedValue = configSchema.parse(config)

		const { host, cert, key } = validatedValue.development

		if (host === "adaptive") {
			const https = Boolean(cert && key)

			validatedValue.development.host = https ? "0.0.0.0" : "localhost"
		}

		return validatedValue
	} catch (error: unknown) {
		if (error instanceof ZodError) {
			const errorMessage = error.errors
				.map(({ path, message }) => `- ${path.join(".")}: ${message}\n`)
				.join("")
			throw new Error(errorMessage)
		}

		console.error(error)
		throw error
	}
}

export const JS_CONFIG_FILENAME = "toolkit.config.js"
