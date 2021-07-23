import { check, waitUntilFreeOnHost } from "tcp-port-used"
import { fm } from "../../util/format"
import { output } from "../../util/output"
import { StepParams } from "../../util/runSteps"

export async function waitForPort({ config }: StepParams): Promise<boolean> {
	const { port, host } = config.development

	const isBusy = await check(port, host)

	if (isBusy) {
		output.warn(
			`The port ${fm.number(port)} on host ${fm.code(
				host
			)} is already in use. Waiting for it to free up...`
		)

		// Checks every 500 ms if the port is free for 2 minutes.
		try {
			await waitUntilFreeOnHost(port, host, 500, 60_000)
			output.info("Is has freed up. Starting the development server...")

			return false
		} catch {
			output.error("The port did not free up within 60 seconds.")
			return true
		}
	}

	return false
}
