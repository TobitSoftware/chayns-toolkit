import type { PackageJson } from "type-fest"
import { types } from "util"

const { isRegExp } = types

type PackageMatcher = string | RegExp

export function isPackageInstalled(
	packageJson: PackageJson,
	query: PackageMatcher
): boolean
export function isPackageInstalled(
	packageJson: PackageJson,
	query: PackageMatcher[]
): string[]
export function isPackageInstalled(
	packageJson: PackageJson,
	query: PackageMatcher | PackageMatcher[]
): string[] | boolean {
	const packageList = Object.keys({
		...packageJson.dependencies,
		...packageJson.devDependencies,
	})

	if (Array.isArray(query)) {
		return packageList.filter((packageName) =>
			query.some((matcher) =>
				isRegExp(matcher) ? matcher.test(packageName) : matcher === packageName
			)
		)
	}

	if (isRegExp(query)) {
		return packageList.some((e) => query.test(e))
	}
	return packageList.includes(query)
}
