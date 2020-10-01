import { resolveProjectPath } from "@chayns-toolkit/utilities"
import * as fs from "fs"
import { fm } from "./format"
import { output } from "./output"

export type PackageManager = "npm" | "yarn"

export function getPackageManager(): PackageManager | undefined {
	const hasPackageLock = npmSearchPaths.some((path) =>
		fs.existsSync(resolveProjectPath(path))
	)
	const hasYarnLock = yarnSearchPaths.some((path) =>
		fs.existsSync(resolveProjectPath(path))
	)

	if (hasPackageLock && hasYarnLock) {
		output.warn(
			`You have both ${fm.path`package-lock.json`} and ${fm.path`yarn.lock`} files in your project.\n`
		)
		output.blank(
			"Decide on wether you want to use Yarn or NPM and remove one of the lockfiles."
		)
	}

	if (hasPackageLock) return "npm"
	if (hasYarnLock) return "yarn"
	return undefined
}

const npmSearchPaths = [
	"./package-lock.json",
	"../package-lock.json",
	"../../package-lock.json",
]

const yarnSearchPaths = ["./yarn.lock", "../yarn.lock", "../../yarn.lock"]
