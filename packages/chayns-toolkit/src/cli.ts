import { Command } from "commander"
import pkg from "../package.json"
import { buildCommand } from "./commands/buildCommand"
import { devCommand } from "./commands/devCommand"
import { lintCommand } from "./commands/lintCommand"
import { checkPackages } from "./features/extraneous-packages/checkPackages"
import { checkSSLConfig } from "./features/ssl-check/checkSSLConfig"
import { checkForTypeScript } from "./features/typescript/checkForTypeScript"
import { output } from "./util/output"
import { runSteps } from "./util/runSteps"

const program = new Command()
program.version(pkg.version, "-v, --version", "output the version number")

program
	.command("dev")
	.description("start up a development server with hot module replacement")
	.action(async () => {
		await runSteps(
			[checkPackages, checkForTypeScript, checkSSLConfig],
			[devCommand]
		)
	})

program
	.command("build")
	.description("bundles your code for production")
	.option("-a, --analyze", "analyze your bundle size", false)
	.action(async (options: { analyze: boolean }) => {
		try {
			await runSteps([buildCommand({ analyze: options.analyze })])
		} catch (e) {
			output.error(e)
		}

		console.info("")
	})

program
	.command("lint")
	.description("lints your code for possible errors")
	.action(async () => {
		await lintCommand()
		console.info("")
	})

program.parse(process.argv)
