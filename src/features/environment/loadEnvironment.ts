import dotenv from "dotenv"

export function loadEnvironment(development = false) {
	if (development) {
		process.env.BABEL_ENV = "development"
		process.env.NODE_ENV = "development"
	} else {
		process.env.BABEL_ENV = "production"
		process.env.NODE_ENV = "production"
	}
	const buildEnv = development ? "development" : process.env.BUILD_ENV || "production"
	dotenv.config({ path: `.env.${buildEnv}.local` })
	dotenv.config({ path: `.env.local` })
	dotenv.config({ path: `.env.${buildEnv}` })
	dotenv.config({ path: ".env" })
}
