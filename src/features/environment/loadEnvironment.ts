import { loadEnv } from "@rsbuild/core"
import chalk from "chalk"
import { output } from "../../util/output"

const initialEnv = { ...process.env }

export function loadEnvironment(development = false) {
	if (development) {
		process.env.BABEL_ENV = "development"
		process.env.NODE_ENV = "development"
		process.env.BUILD_ENV ||= "development"
	} else {
		process.env.BABEL_ENV = "production"
		process.env.NODE_ENV = "production"
		process.env.BUILD_ENV ||= "production"
	}
	const buildEnv = process.env.BUILD_ENV
	output.info(`Loading environment ${chalk.yellow(buildEnv)}`)

	loadEnv({
		mode: buildEnv,
	})
}

export function resetEnvironment() {
	Object.keys(process.env).forEach((k) => {
		if (!(k in initialEnv)) {
			delete process.env[k]
		} else if (initialEnv[k] !== process.env[k]) {
			process.env[k] = initialEnv[k]
		}
	})
}
