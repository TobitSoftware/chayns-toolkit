import * as fs from "fs"
import * as path from "path"
import type { PackageJson } from "type-fest"
import { promisify } from "util"

const readFileAsync = promisify(fs.readFile)

type PackageMatcher = string | RegExp

export async function usesPackage(query: PackageMatcher): Promise<boolean>
export async function usesPackage(query: PackageMatcher[]): Promise<string[]>
export async function usesPackage(
	query: PackageMatcher | PackageMatcher[]
): Promise<boolean | string[]> {
	const packagePath = path.resolve(process.cwd(), "package.json")

	const packageJsonString = await readFileAsync(packagePath, {
		encoding: "utf-8",
	})

	const packageJson = JSON.parse(packageJsonString) as PackageJson

	const packageList = Object.keys({
		...packageJson.dependencies,
		...packageJson.devDependencies,
	})

	if (Array.isArray(query)) {
		return packageList.filter((packageName) =>
			query.some((matcher) => {
				if (isRegExp(matcher)) {
					return matcher.test(packageName)
				}
				return matcher === packageName
			})
		)
	}

	if (isRegExp(query)) {
		return packageList.some((e) => query.test(e))
	}
	return packageList.includes(query)
}

export function usesPackageSync(packageName: string): boolean {
	const packagePath = path.resolve(process.cwd(), "package.json")

	const packageJsonString = fs.readFileSync(packagePath, {
		encoding: "utf-8",
	})

	const packageJson = JSON.parse(packageJsonString) as PackageJson

	return Object.keys({
		...packageJson.dependencies,
		...packageJson.devDependencies,
	}).includes(packageName)
}

function isRegExp(value: unknown): value is RegExp {
	return Object.prototype.toString.call(value) === "[object RegExp]"
}
