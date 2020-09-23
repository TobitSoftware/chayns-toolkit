import chalk from "chalk"

export const output = {
	info(text: string): void {
		console.info(`${chalk.blueBright("info ")} -  ${text}`)
	},
	warn(text: string): void {
		console.info(`${chalk.yellowBright("warn ")} -  ${text}`)
	},
	error(text: string): void {
		console.info(`${chalk.redBright("error")} -  ${text}`)
	},
}
