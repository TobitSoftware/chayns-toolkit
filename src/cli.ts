import { Command } from "commander"
import { buildCommand } from "./commands/buildCommand"
import { devCommand } from "./commands/devCommand"
import { lintCommand } from "./commands/lintCommand"
import { testCommand } from "./commands/testCommand"
import { loadEnvironment } from "./features/environment/loadEnvironment"
import { checkSSLConfig } from "./features/ssl-check/checkSSLConfig"
import { checkForTypeScript } from "./features/typescript/checkForTypeScript"
import { output } from "./util/output"
import { runSteps } from "./util/runSteps"

const program = new Command()
program.version(__PKG_VERSION__, "-v, --version", "output the version number")

program
	.command("dev")
	.description("start up a development server with hot module replacement")
	.option("-d, --devtools", "open react-devtools in a separate window", false)
	.action(async (options: { devtools: boolean }) => {
		loadEnvironment(true)
		await runSteps(
			[checkForTypeScript, checkSSLConfig],
			[devCommand({ devtools: options.devtools })]
		)
	})

program
	.command("build")
	.description("bundles your code for production")
	.option("-a, --analyze", "analyze your bundle size", false)
	.action(async (options: { analyze: boolean }) => {
		try {
			loadEnvironment(false)
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

program
	.command("test")
	.description("executes all Jest tests for this project")
	.option("-w, --watch", "watch for changes to rerun tests", false)
	.option(
		"--setupFile <path>",
		"file that should be executed before the tests are initialized",
		""
	)
	.action(async (options: { watch: boolean; setupFile: string }) => {
		try {
			await runSteps([testCommand(options)])
		} catch (e) {
			output.error(e)
		}

		console.info("")
	})

program.parse(process.argv)
