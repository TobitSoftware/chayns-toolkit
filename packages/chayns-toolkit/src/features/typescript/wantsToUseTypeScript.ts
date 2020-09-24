import glob from "fast-glob"
import * as fs from "fs"
import { resolveProjectPath } from "../../util/resolveProjectPath"

export async function wantsToUseTypeScript(): Promise<boolean> {
	const hasTsConfig = fs.existsSync(resolveProjectPath("tsconfig.json"))

	if (hasTsConfig) return true

	const tsFiles = await glob("src/**/*.{ts,tsx}")

	return tsFiles.length > 0
}