import { resolveProjectPath } from "@chayns-toolkit/utilities"
import * as fs from "fs"
import type { PackageJson } from "type-fest"
import { promisify } from "util"

const readFileAsync = promisify(fs.readFile)

export async function loadPackageJson(): Promise<PackageJson> {
	const packageJsonString = await readFileAsync(
		resolveProjectPath("package.json"),
		{ encoding: "utf-8" }
	)
	return JSON.parse(packageJsonString) as PackageJson
}
