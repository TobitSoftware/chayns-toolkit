import * as fs from "fs"
import { resolveProjectPath } from "./resolveProjectPath"

export type PackageManager = "npm" | "yarn"

export function getPackageManager(): PackageManager | undefined {
	const isNpm = npmSearchPaths.some((path) =>
		fs.existsSync(resolveProjectPath(path))
	)

	if (isNpm) return "npm"

	const isYarn = yarnSearchPaths.some((path) => {
		console.log(resolveProjectPath(path))
		return fs.existsSync(resolveProjectPath(path))
	})

	if (isYarn) return "yarn"

	return undefined
}

const npmSearchPaths = [
	"./package-lock.json",
	"../package-lock.json",
	"../../package-lock.json",
]

const yarnSearchPaths = ["./yarn.lock", "../yarn.lock", "../../yarn.lock"]
