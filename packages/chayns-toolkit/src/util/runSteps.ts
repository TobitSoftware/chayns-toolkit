/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import type { JSONSchemaForNPMPackageJsonFiles as PackageJson } from "@schemastore/package"
import { ChaynsScriptsConfiguration } from "../features/config-file/configSchema"
import { loadConfig } from "../features/config-file/loadConfig"
import { getPackageManager, PackageManager } from "./getPackageManager"
import { loadPackageJson } from "./loadPackageJson"
import { output } from "./output"

export interface StepParams {
	config: ChaynsScriptsConfiguration
	packageJson: PackageJson
	packageManager: PackageManager | undefined
}

type PromiseOrNot<T> = T | Promise<T>
type Step = (params: StepParams) => PromiseOrNot<boolean> | PromiseOrNot<void>

export async function runSteps(...sequences: Array<Step[]>): Promise<void> {
	const [config, packageJson, packageManager] = await Promise.all([
		loadConfig(),
		loadPackageJson(),
		getPackageManager(),
	])

	for (const sequence of sequences) {
		let shouldContinue = true

		if (shouldContinue) {
			for (const step of sequence) {
				const result = await step({ config, packageJson, packageManager })

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
