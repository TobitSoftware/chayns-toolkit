import { Command } from "commander"
import { buildCommand } from "./commands/buildCommand"
import { devCommand } from "./commands/devCommand"
import { lintCommand } from "./commands/lintCommand"
import { testCommand } from "./commands/testCommand"
import { convertConfigFile } from "./features/config-file/convertConfigFile"
import { checkSSLConfig } from "./features/ssl-check/checkSSLConfig"
import { checkForTypeScript } from "./features/typescript/checkForTypeScript"
import { waitForPort } from "./features/wait-for-port/waitForPort"
import { output } from "./util/output"
import { runSteps } from "./util/runSteps"

const program = new Command()
program.version(__PKG_VERSION__, "-v, --version", "output the version number")

program
	.command("dev")
	.description("start up a development server with hot module replacement")
	.option("-d, --devtools", "open react-devtools in a separate window", false)
	.action(async (options: { devtools: boolean }) => {
		await runSteps(
			[
				convertConfigFile,
				checkForTypeScript,
				checkSSLConfig,
				waitForPort,
			],
			[devCommand({ devtools: options.devtools })]
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
		await testCommand(options)
		console.info("")
	})

program.parse(process.argv)
