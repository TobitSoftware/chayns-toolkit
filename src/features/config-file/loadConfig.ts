import { ZodError } from "zod"
import { readFileSync } from "node:fs"
import Module from "node:module"
import { project } from "../../util/project"
import { configSchema, ParsedToolkitConfig, ToolkitConfig } from "./configSchema"
import { output } from "../../util/output"
import { fm } from "../../util/format"

const JS_CONFIG_FILENAME = "toolkit.config.js"
const CJS_CONFIG_FILENAME = "toolkit.config.cjs"
const MJS_CONFIG_FILENAME = "toolkit.config.mjs"
const TS_CONFIG_FILENAME = "toolkit.config.ts"
// eslint-disable-next-line import/no-mutable-exports
export let usedConfigFilename: string | undefined

export async function loadConfig(): Promise<ParsedToolkitConfig> {
	let config: ToolkitConfig = {}

	if (project.hasFile(TS_CONFIG_FILENAME)) {
		usedConfigFilename = TS_CONFIG_FILENAME
	} else if (project.hasFile(MJS_CONFIG_FILENAME)) {
		usedConfigFilename = MJS_CONFIG_FILENAME
	} else if (project.hasFile(CJS_CONFIG_FILENAME)) {
		usedConfigFilename = CJS_CONFIG_FILENAME
	} else if (project.hasFile(JS_CONFIG_FILENAME)) {
		usedConfigFilename = JS_CONFIG_FILENAME
	} else {
		usedConfigFilename = undefined
	}

	if (usedConfigFilename) {
		output.info(`loading ${fm.path(usedConfigFilename)}...`)
		if (usedConfigFilename === TS_CONFIG_FILENAME) {
			const { default: ts } = await import("typescript")
			const transpiled = ts.transpile(readFileSync(TS_CONFIG_FILENAME, "utf-8"), {
				esModuleInterop: true,
			})
			const m = new Module(TS_CONFIG_FILENAME)
			m.paths = [project.resolvePath("node_modules")]
			// @ts-expect-error internal function
			// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/no-unsafe-call
			m._compile(transpiled, TS_CONFIG_FILENAME)
			config = (m.exports as { default: ToolkitConfig }).default
		} else {
			delete require.cache[project.resolvePath(usedConfigFilename)]
			config = (
				(await import(
					`file://${project.resolvePath(usedConfigFilename)}?update=${Date.now()}`
				)) as {
					default: ToolkitConfig
				}
			).default
		}
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
