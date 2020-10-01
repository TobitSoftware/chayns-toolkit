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

export async function runSteps(...steps: Step[]): Promise<boolean> {
	const [config, packageJson, packageManager] = await Promise.all([
		loadConfig(),
		loadPackageJson(),
		getPackageManager(),
	])

	let shouldContinue = true

	// eslint-disable-next-line no-restricted-syntax
	for (const step of steps) {
		// eslint-disable-next-line no-await-in-loop
		const result = await step({ config, packageJson, packageManager })

		if (result) {
			shouldContinue = false
		}
	}

	output.blank("")

	return shouldContinue
}
