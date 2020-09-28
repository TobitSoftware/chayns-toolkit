import { resolveProjectPath } from "@chayns-toolkit/utilities"
import * as fs from "fs"
import { promisify } from "util"

const readFileAsync = promisify(fs.readFile)

export async function shouldCreateTsConfig(): Promise<boolean> {
	const hasTsConfig = fs.existsSync(resolveProjectPath("tsconfig.json"))

	if (!hasTsConfig) return true

	const tsConfig = await readFileAsync(resolveProjectPath("tsconfig.json"), {
		encoding: "utf-8",
	})

	const trimmedTsConfig = tsConfig.replace(/\s/gi, "")

	return trimmedTsConfig === "" || trimmedTsConfig === "{}"
}
