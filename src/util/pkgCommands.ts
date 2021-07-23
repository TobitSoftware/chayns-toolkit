import { fm } from "./format"
import { PackageManager } from "./getPackageManager"

export const pkgCommands = {
	install(
		packageManager: PackageManager | undefined,
		packages: string | string[],
		asDevDependencies = false
	): string {
		let command = "npm i "

		if (packageManager === "yarn") command = `yarn add `

		if (Array.isArray(packages)) {
			command += packages.join(" ")
		} else {
			command += packages
		}

		if (asDevDependencies) command += " -D"

		return fm.command(command)
	},

	remove(
		packageManager: PackageManager | undefined,
		packages: string | string[]
	): string {
		let command = packageManager === "yarn" ? "yarn remove " : "npm remove "

		command += Array.isArray(packages) ? packages.join(" ") : packages

		return fm.command(command)
	},

	move(
		packageManager: PackageManager | undefined,
		packages: string | string[],
		to: "dev" | "prod"
	): string {
		const packageString = Array.isArray(packages)
			? packages.join(" ")
			: packages

		if (packageManager === "yarn") {
			return fm.command(
				`yarn remove ${packageString} && yarn add ${packageString}${
					to === "dev" ? " -D" : ""
				}`
			)
		}

		return fm.command(
			`npm install ${packageString}${to === "dev" ? " -D" : ""}`
		)
	},
}
