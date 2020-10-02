import { resolveProjectPath } from "@chayns-toolkit/utilities"
import type { JSONSchemaForNPMPackageJsonFiles as PackageJson } from "@schemastore/package"
import * as fs from "fs"
import { promisify } from "util"

const readFileAsync = promisify(fs.readFile)

export async function loadPackageJson(): Promise<PackageJson> {
	const packageJsonString = await readFileAsync(
		resolveProjectPath("package.json"),
		{ encoding: "utf-8" }
	)
	return JSON.parse(packageJsonString) as PackageJson
}
