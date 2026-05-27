import { fm } from "./format"
import { output } from "./output"
import { project } from "./project"

export type PackageManager = "npm" | "yarn" | "pnpm"

const npmLockName = "package-lock.json"
const yarnLockName = "yarn.lock"
const pnpmLockName = "pnpm-lock.yaml"

const checkLockfile = (name: string) =>
	project.hasFile(`./${name}`) ||
	project.hasFile(`../${name}`) ||
	project.hasFile(`../../${name}`)

export function getPackageManager(): PackageManager | undefined {
	const hasPackageLock = checkLockfile(npmLockName)
	const hasYarnLock = checkLockfile(yarnLockName)
	const hasPnpmLock = checkLockfile(pnpmLockName)

	const detected = [
		hasPackageLock && npmLockName,
		hasYarnLock && yarnLockName,
		hasPnpmLock && pnpmLockName,
	].filter(Boolean) as string[]

	if (detected.length > 1) {
		output.warn(`Multiple lockfiles detected: ${detected.map((d) => fm.path(d)).join(", ")}.\n`)
		output.blank("Using priority order: pnpm > yarn > npm. Consider removing unused lockfiles.")
	}

	if (hasPnpmLock) return "pnpm"
	if (hasYarnLock) return "yarn"
	if (hasPackageLock) return "npm"
	return undefined
}
