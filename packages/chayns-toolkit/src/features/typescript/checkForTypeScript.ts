import { resolveProjectPath, usesPackage } from "@chayns-toolkit/utilities"
import chalk from "chalk"
import * as fs from "fs"
import { promisify } from "util"
import { fm } from "../../util/format"
import { getPackageManager } from "../../util/getPackageManager"
import { output } from "../../util/output"
import { pkgCommands } from "../../util/packageCommands"
import { checkForTypesPackages } from "./checkForTypesPackages"
import { shouldCreateTsConfig } from "./shouldCreateTsConfig"
import { wantsToUseTypeScript } from "./wantsToUseTypeScript"

const writeFileAsync = promisify(fs.writeFile)

export async function checkForTypeScript(): Promise<void> {
	const hasTypeScript = await usesPackage("typescript")
	const shouldCreateConfig = await shouldCreateTsConfig()

	if (hasTypeScript) {
		await checkForTypesPackages()

		if (shouldCreateConfig) {
			await createTsConfig()
		}

		return
	}

	const wantsToUse = await wantsToUseTypeScript()

	if (wantsToUse) {
		const packageManager = getPackageManager()

		if (shouldCreateConfig) {
			await createTsConfig()
		}

		output.info(
			`To use TypeScript, you have to install the ${fm.code`typescript`} package by running ${pkgCommands.install(
				packageManager,
				"typescript",
				true
			)}.`
		)

		output.exit()
	}
}

async function createTsConfig(): Promise<void> {
	await writeFileAsync(
		resolveProjectPath("tsconfig.json"),
		JSON.stringify(defaultTsconfig, undefined, 4)
	)

	output.info(
		`Seems like you want to use TypeScript. A ${chalk.blueBright(
			"tsconfig.json"
		)} file has been set up for you.`
	)
}

const defaultTsconfig = {
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
	},
}
