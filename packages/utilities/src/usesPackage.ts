import * as fs from "fs"
import * as path from "path"
import { promisify } from "util"

const readFileAsync = promisify(fs.readFile)

export async function usesPackage(packageName: string): Promise<boolean> {
	const packagePath = path.resolve(process.cwd(), "package.json")

	const packageJsonString = await readFileAsync(packagePath, {
		encoding: "utf-8",
	})

	const packageJson = JSON.parse(packageJsonString)

	return Object.keys({
		...packageJson.dependencies,
		...packageJson.devDependencies,
	}).includes(packageName)
}

export function usesPackageSync(packageName: string): boolean {
	const packagePath = path.resolve(process.cwd(), "package.json")

	const packageJsonString = fs.readFileSync(packagePath, {
		encoding: "utf-8",
	})

	const packageJson = JSON.parse(packageJsonString)

	return Object.keys({
		...packageJson.dependencies,
		...packageJson.devDependencies,
	}).includes(packageName)
}
