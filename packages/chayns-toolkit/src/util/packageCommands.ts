import { fm } from "./format"
import { PackageManager } from "./getPackageManager"

export const pkgCommands = {
	install(
		packageManager: PackageManager | undefined,
		packages: string | string[],
		dev = false
	): string {
		let command = "npm i "

		if (packageManager === "yarn") command = `yarn add `

		if (Array.isArray(packages)) {
			command += packages.join(" ")
		} else {
			command += packages
		}

		if (dev) command += " -D"

		return fm.command(command)
	},
}
