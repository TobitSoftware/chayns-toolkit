import chalk from "chalk"
import dotenv from "dotenv"
import { output } from "../../util/output"

export function loadEnvironment(development = false) {
	if (development) {
		process.env.BABEL_ENV = "development"
		process.env.NODE_ENV = "development"
	} else {
		process.env.BABEL_ENV = "production"
		process.env.NODE_ENV = "production"
	}
	const buildEnv = process.env.BUILD_ENV || (!development ? "production" : "development")
	output.info(`Loading environment ${chalk.yellow(buildEnv)}`)

	dotenv.config({ path: `.env.${buildEnv}.local` })
	dotenv.config({ path: `.env.local` })
	dotenv.config({ path: `.env.${buildEnv}` })
	dotenv.config({ path: ".env" })
}
