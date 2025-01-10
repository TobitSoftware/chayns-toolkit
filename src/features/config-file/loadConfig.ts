import ts from "typescript"
import * as yup from "yup"
import { project } from "../../util/project"
import { configSchema, ToolkitConfig } from "./configSchema"
import { output } from "../../util/output"
import { fm } from "../../util/format"
import { readFileSync } from "fs"

const JS_CONFIG_FILENAME = "toolkit.config.js"
const MJS_CONFIG_FILENAME = "toolkit.config.mjs"
export const TS_CONFIG_FILENAME = "toolkit.config.ts"
export let usedConfigFilename: string | undefined = undefined

export async function loadConfig(): Promise<ToolkitConfig> {
	let config: Partial<ToolkitConfig> = {}

	if (project.hasFile(TS_CONFIG_FILENAME)) {
		usedConfigFilename = TS_CONFIG_FILENAME
	} else if (project.hasFile(MJS_CONFIG_FILENAME)) {
		usedConfigFilename = MJS_CONFIG_FILENAME
	} else if (project.hasFile(JS_CONFIG_FILENAME)) {
		usedConfigFilename = JS_CONFIG_FILENAME
	} else {
		usedConfigFilename = undefined
	}

	if (usedConfigFilename) {
		output.info(`loading ${fm.path(usedConfigFilename)}...`)
		if (usedConfigFilename === TS_CONFIG_FILENAME) {
			var transpiled = ts.transpile(readFileSync(TS_CONFIG_FILENAME, "utf-8"), {
				esModuleInterop: true,
			})
			// @ts-expect-error
			var m = new module.constructor()
			m._compile(transpiled, JS_CONFIG_FILENAME)
			config = m.exports.default
		} else {
			;({ default: config } = (await import(
				`file://${project.resolvePath(usedConfigFilename)}?update=${Date.now()}`
			)) as {
				default: Partial<ToolkitConfig>
			})
		}
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
