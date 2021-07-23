import type { PackageJson } from "type-fest"
import { project } from "./project"

export async function loadPackageJson(): Promise<PackageJson> {
	const packageJsonString = await project.readFile("package.json")

	if (packageJsonString === null) {
		throw Error("No package.json file was found.")
	}
	return JSON.parse(packageJsonString) as PackageJson
}
