import { fm } from "./format"
import { PackageManager } from "./getPackageManager"

const installCommands: Record<PackageManager, string> = {
	npm: "npm i",
	pnpm: "pnpm add",
	yarn: "yarn add",
}

const removeCommands: Record<PackageManager, string> = {
	npm: "npm remove",
	pnpm: "pnpm remove",
	yarn: "yarn remove",
}

export const pkgCommands = {
	install(
		packageManager: PackageManager | undefined,
		packages: string | string[],
		asDevDependencies = false,
		forceProduction = false,
	): string {
		const parts: string[] = []
		parts.push(installCommands[packageManager ?? "npm"])

		if (asDevDependencies) {
			parts.push("-D")
		} else if (forceProduction) {
			parts.push("-P")
		}

		parts.push(Array.isArray(packages) ? packages.join(" ") : packages)

		return fm.command(parts.join(" "))
	},

	remove(packageManager: PackageManager | undefined, packages: string | string[]): string {
		const parts: string[] = []
		parts.push(removeCommands[packageManager ?? "npm"])

		parts.push(Array.isArray(packages) ? packages.join(" ") : packages)

		return fm.command(parts.join(" "))
	},

	move(
		packageManager: PackageManager | undefined,
		packages: string | string[],
		to: "dev" | "prod",
	): string {
		return pkgCommands.install(packageManager, packages, to === "dev", true)
	},
}
