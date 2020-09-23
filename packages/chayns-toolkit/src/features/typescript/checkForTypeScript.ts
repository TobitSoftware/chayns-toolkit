import { usesPackage } from "@chayns-toolkit/utilities"
import chalk from "chalk"
import * as fs from "fs"
import { promisify } from "util"
import { output } from "../../util/output"
import { resolveProjectPath } from "../../util/resolveProjectPath"
import { shouldCreateTsConfig } from "./shouldCreateTsConfig"
import { wantsToUseTypeScript } from "./wantsToUseTypeScript"

const writeFileAsync = promisify(fs.writeFile)

export async function checkForTypeScript(): Promise<void> {
	const hasTypeScript = await usesPackage("typescript")
	const shouldCreateConfig = await shouldCreateTsConfig()

	if (hasTypeScript) {
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

		let installCommand: string | undefined

		if (packageManager === "npm") {
			installCommand = "npm i typescript -D"
		} else if (packageManager === "yarn") {
			installCommand = "yarn add typescript -D"
		}

		if (installCommand !== undefined) {
			output.info(
				`To use TypeScript, you have to install the ${chalk.blueBright(
					"typescript"
				)} package by running \`${installCommand}\`.\n`
			)
		} else {
			output.info(
				`To use TypeScript, you have to install the ${chalk.blueBright(
					"typescript"
				)} package.\n`
			)
		}

		process.exit(0)
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
		)} file has been set up for you.\n`
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

type PackageManager = "npm" | "yarn"

function getPackageManager(): PackageManager | undefined {
	if (fs.existsSync(resolveProjectPath("package-lock.json"))) {
		return "npm"
	}

	if (fs.existsSync(resolveProjectPath("yarn.lock"))) {
		return "yarn"
	}

	return undefined
}
