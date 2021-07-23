import chalk from "chalk"

export const output = {
	info(text: string): void {
		console.info(`${chalk.hex("#76A9FA")("info ")} - ${text}`)
	},
	hint(text: string): void {
		console.info(`${chalk.hex("#31C48D")("hint ")} - ${text}`)
	},
	warn(text: string): void {
		console.info(`${chalk.hex("#FACA15")("warn ")} - ${text}`)
	},
	error(text: string): void {
		console.info(`${chalk.hex("#F98080")("error")} - ${text}`)
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
