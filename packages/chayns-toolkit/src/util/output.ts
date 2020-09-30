import chalk from "chalk"

export const output = {
	info(text: string): void {
		console.info(`${chalk.blueBright("info ")} - ${text}`)
	},
	hint(text: string): void {
		console.info(`${chalk.greenBright("hint ")} - ${text}`)
	},
	warn(text: string): void {
		console.info(`${chalk.yellowBright("warn ")} - ${text}`)
	},
	error(text: string): void {
		console.info(`${chalk.redBright("error")} - ${text}`)
	},
	blank(text: string): void {
		console.info(`        ${text}`)
	},
	exit(code?: number): void {
		console.info("")
		if (code) {
			process.exit(code)
		} else {
			process.exit()
		}
	},
}
