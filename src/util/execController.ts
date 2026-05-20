import { spawn } from "child_process"
import { output } from "./output"

const EXEC_RESTART_DELAY_MS = 200

type PendingActionType = "start" | "stop"

const waitForExecRestartDelay = async () => {
	await new Promise((resolve) => {
		setTimeout(resolve, EXEC_RESTART_DELAY_MS)
	})
}

export function createExecController(command?: string) {
	let runningCommand: ReturnType<typeof spawn> | undefined
	let pendingAction:
		| {
				type: PendingActionType
				promise: Promise<void>
		  }
		| undefined

	const runAction = (type: PendingActionType, action: () => Promise<void>) => {
		if (pendingAction?.type === type) {
			return pendingAction.promise
		}

		const promise = (pendingAction?.promise ?? Promise.resolve())
			.catch(() => {
				// noop, the next action should still run
			})
			.then(action)
			.finally(() => {
				if (pendingAction?.promise === promise) {
					pendingAction = undefined
				}
			})

		pendingAction = {
			type,
			promise,
		}

		return promise
	}

	const stopRunningCommand = async () => {
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
		return runAction("start", async () => {
			if (!command) {
				return
			}

			const isRestart = Boolean(runningCommand)
			if (runningCommand) {
				await stopRunningCommand()
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
		})
	}

	const stop = async () => {
		return runAction("stop", stopRunningCommand)
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
