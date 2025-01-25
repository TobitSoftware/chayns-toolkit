import type { PackageJson } from "type-fest"

type PackageMatcher = string | RegExp

export function isPackageInstalled(packageJson: PackageJson, query: PackageMatcher): boolean
export function isPackageInstalled(packageJson: PackageJson, query: PackageMatcher[]): string[]
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
				matcher instanceof RegExp ? matcher.test(packageName) : matcher === packageName
			)
		)
	}

	if (query instanceof RegExp) {
		return packageList.some((e) => query.test(e))
	}
	return packageList.includes(query)
}
