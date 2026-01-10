import type { PackageJson } from "type-fest"
import { ParsedToolkitConfig } from "../features/config-file/configSchema"
import { loadConfig } from "../features/config-file/loadConfig"
import { getPackageManager, PackageManager } from "./getPackageManager"
import { loadPackageJson } from "./loadPackageJson"
import { output } from "./output"

export interface StepParams {
	config: ParsedToolkitConfig
	packageJson: PackageJson
	packageManager: PackageManager | undefined
}

type PromiseOrNot<T> = T | Promise<T>
type Step = (params: StepParams) => PromiseOrNot<boolean> | PromiseOrNot<void>

export async function runSteps(...sequences: Array<Step[]>): Promise<void> {
	let config: ParsedToolkitConfig

	try {
		config = await loadConfig()
	} catch (e) {
		const error = e as Error
		output.error(`An error occured while loading the toolkit config:\n`)
		output.blank(error.message)
		output.exit(1)
		return
	}

	const [packageJson, packageManager] = await Promise.all([
		loadPackageJson(),
		// eslint-disable-next-line @typescript-eslint/await-thenable
		getPackageManager(),
	])

	let shouldContinue = true

	for (const sequence of sequences) {
		if (shouldContinue) {
			for (const step of sequence) {
				const result = await step({
					config,
					packageJson,
					packageManager,
				})

				if (result) {
					shouldContinue = false
				}
			}

			if (sequences.indexOf(sequence) !== sequences.length - 1) {
				output.blank("")
			}
		}
	}
}
