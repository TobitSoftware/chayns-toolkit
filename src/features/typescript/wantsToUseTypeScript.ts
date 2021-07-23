import glob from "fast-glob"
import { project } from "../../util/project"

export async function wantsToUseTypeScript(): Promise<boolean> {
	const hasTsConfig = project.hasFile("tsconfig.json")

	if (hasTsConfig) return true

	const tsFiles = await glob("src/**/*.{ts,tsx}")

	return tsFiles.length > 0
}
