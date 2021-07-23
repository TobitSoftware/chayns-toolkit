import { project } from "../../util/project"

export async function shouldCreateTsConfig(): Promise<boolean> {
	const hasTsConfig = project.hasFile("tsconfig.json")

	if (!hasTsConfig) return true

	const tsConfig = (await project.readFile("tsconfig.json")) ?? ""

	const trimmedTsConfig = tsConfig.replace(/\s/gi, "")

	return trimmedTsConfig === "" || trimmedTsConfig === "{}"
}
