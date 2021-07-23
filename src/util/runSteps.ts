import type { PackageJson } from "type-fest"
import { ToolkitConfig } from "../features/config-file/configSchema"
import { loadConfig } from "../features/config-file/loadConfig"
import { fm } from "./format"
import { getPackageManager, PackageManager } from "./getPackageManager"
import { loadPackageJson } from "./loadPackageJson"
import { output } from "./output"

export interface StepParams {
	config: ToolkitConfig
	packageJson: PackageJson
	packageManager: PackageManager | undefined
}

type PromiseOrNot<T> = T | Promise<T>
type Step = (params: StepParams) => PromiseOrNot<boolean> | PromiseOrNot<void>

export async function runSteps(...sequences: Array<Step[]>): Promise<void> {
	let config: ToolkitConfig

	try {
		config = await loadConfig()
	} catch (e) {
		const error = e as Error
		output.error(
			`An error occured while loading the ${fm.path`chayns-toolkit.json`} file:\n`
		)
		output.blank(error.message)
		return
	}

	const [packageJson, packageManager] = await Promise.all([
		loadPackageJson(),
		getPackageManager(),
	])

	let shouldContinue = true

	for (const sequence of sequences) {
		if (shouldContinue) {
			for (const step of sequence) {
				// eslint-disable-next-line no-await-in-loop
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
