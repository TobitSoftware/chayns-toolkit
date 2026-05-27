import { Command } from "commander"
import { buildCommand } from "./commands/buildCommand"
import { devCommand } from "./commands/devCommand"
import { lintCommand } from "./commands/lintCommand"
import { loadEnvironment } from "./features/environment/loadEnvironment"
import { checkSSLConfig } from "./features/ssl-check/checkSSLConfig"
import { checkForTypeScript } from "./features/typescript/checkForTypeScript"
import { output } from "./util/output"
import { runSteps } from "./util/runSteps"
import { serveCommand } from "./commands/serveCommand"

const program = new Command()
program.version(__PKG_VERSION__, "-v, --version", "output the version number")

program
	.command("dev")
	.description("start up a development server with hot module replacement")
	.option("-d, --devtools", "open react-devtools in a separate window", false)
	.option("-e, --exec <command>", "run a command after a successful compile")
	.action(async (options: { devtools: boolean; exec?: string }) => {
		loadEnvironment(true)
		await runSteps(
			[checkForTypeScript, checkSSLConfig],
			[devCommand({ devtools: options.devtools, exec: options.exec })],
		)
	})

program
	.command("build")
	.description("bundles your code for production")
	.option("-a, --analyze", "analyze your bundle size", false)
	.option("-e, --exec <command>", "run a command after a successful build")
	.option("-p, --preview", "start a preview server after building", false)
	.option("-w, --watch", "watch for file changes", false)
	.action(
		async (options: { analyze: boolean; exec?: string; preview: boolean; watch: boolean }) => {
			try {
				loadEnvironment(false)
				await runSteps([
					buildCommand({
						analyze: options.analyze,
						exec: options.exec,
						preview: options.preview,
						watch: options.watch,
					}),
				])
			} catch (e) {
				output.error(e as string)
				output.exit(1)
			}

			console.info("")
		},
	)

program
	.command("lint")
	.description("lints your code for possible errors")
	.action(async () => {
		await lintCommand()
		console.info("")
	})

program
	.command("serve")
	.description("serves the files from a local build folder")
	.option("-p, --port <number>", "port number")
	.action(async ({ port }: { port?: number }) => {
		try {
			await runSteps([serveCommand({ port })])
		} catch (e) {
			output.error(e as string)
		}
	})

program.parse(process.argv)
