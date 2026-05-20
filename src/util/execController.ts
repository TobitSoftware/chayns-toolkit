import { spawn } from "child_process"
import { output } from "./output"

const EXEC_RESTART_DELAY_MS = 200

const waitForExecRestartDelay = async () => {
	await new Promise((resolve) => {
		setTimeout(resolve, EXEC_RESTART_DELAY_MS)
	})
}

export function createExecController(command?: string) {
	let runningCommand: ReturnType<typeof spawn> | undefined

	const stop = async () => {
		if (!runningCommand || runningCommand.exitCode !== null || runningCommand.killed) {
			runningCommand = undefined
			return
		}

		const processToStop = runningCommand
		runningCommand = undefined
		output.info(`Stopping command: ${command}`)

		await new Promise<void>((resolve) => {
			processToStop.once("exit", () => {
				resolve()
			})
			processToStop.kill()
		})

		await waitForExecRestartDelay()
	}

	const start = async () => {
		if (!command) {
			return
		}

		const isRestart = Boolean(runningCommand)
		if (runningCommand) {
			await stop()
		}

		output.info(`${isRestart ? "Restarting" : "Starting"} command: ${command}`)

		const child = spawn(command, {
			env: process.env,
			shell: true,
			stdio: "inherit",
		})

		runningCommand = child

		child.once("error", (error) => {
			if (runningCommand === child) {
				runningCommand = undefined
			}
			output.error(`Failed to start command "${command}": ${error.message}`)
		})

		child.once("exit", () => {
			if (runningCommand === child) {
				runningCommand = undefined
			}
		})
	}

	const kill = () => {
		runningCommand?.kill()
	}

	return {
		start,
		stop,
		kill,
	}
}
