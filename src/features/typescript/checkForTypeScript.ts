import type { TsConfigJson } from "type-fest"
import { fm } from "../../util/format"
import { isPackageInstalled } from "../../util/isPackageInstalled"
import { output } from "../../util/output"
import { pkgCommands } from "../../util/pkgCommands"
import { project } from "../../util/project"
import { StepParams } from "../../util/runSteps"
import { checkForTypesPackages } from "./checkForTypesPackages"
import { shouldCreateTsConfig } from "./shouldCreateTsConfig"
import { wantsToUseTypeScript } from "./wantsToUseTypeScript"

export async function checkForTypeScript({
	packageJson,
	packageManager,
}: StepParams): Promise<boolean> {
	const hasTypeScript = isPackageInstalled(packageJson, "typescript")

	const shouldCreateConfig = await shouldCreateTsConfig()

	if (hasTypeScript) {
		await checkForTypesPackages(packageManager)

		if (shouldCreateConfig) {
			await createTsConfig()
		}

		return false
	}

	const wantsToUse = await wantsToUseTypeScript()

	if (wantsToUse) {
		if (shouldCreateConfig) {
			await createTsConfig()
		}

		output.error(
			`To use TypeScript, you have to install the ${fm.code`typescript`} package by running ${pkgCommands.install(
				packageManager,
				"typescript",
				true
			)}.`
		)

		return true
	}

	return false
}

async function createTsConfig(): Promise<void> {
	await project.writeFile("tsconfig.json", JSON.stringify(defaultTsconfig, undefined, 4))

	output.info(
		`Seems like you want to use TypeScript. A ${fm.path`tsconfig.json`} file has been set up for you.`
	)
}

const defaultTsconfig: TsConfigJson = {
	compilerOptions: {
		allowJs: true,
		allowSyntheticDefaultImports: true,
		checkJs: false,
		esModuleInterop: true,
		experimentalDecorators: true,
		isolatedModules: true,
		jsx: "react",
		lib: ["DOM", "ESNext"],
		noEmit: true,
		skipLibCheck: true,
		strict: true,
		baseUrl: "src",
	},
}
