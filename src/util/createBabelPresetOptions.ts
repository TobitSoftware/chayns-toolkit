import semver from "semver"
import type { PackageJson } from "type-fest"
import { isPackageInstalled } from "./isPackageInstalled"
import { project } from "./project"

type CreateConfigOptions = {
	packageJson: PackageJson
	transpileModules?: false | "commonjs"
	reactRefreshSupport?: boolean
}

type BabelPresetOptions = {
	typescriptSupport: boolean
	flowSupport: boolean
	transformChaynsComponentsImports: boolean
	transpileModules: boolean | "commonjs"
	reactRefreshSupport: boolean
}

export default function createBabelPresetOptions({
	packageJson,
	transpileModules = false,
	reactRefreshSupport = true,
}: CreateConfigOptions): BabelPresetOptions {
	let transformChaynsComponentsImports = false

	const componentsVersion = packageJson.dependencies?.["chayns-components"]

	if (componentsVersion) {
		const minComponentsVersion = semver.minVersion(componentsVersion)

		if (minComponentsVersion) {
			transformChaynsComponentsImports = !semver.gt(
				minComponentsVersion,
				"4.19.0"
			)
		}
	}

	return {
		typescriptSupport: isPackageInstalled(packageJson, "typescript"),
		flowSupport: project.hasFile(".flowconfig"),
		transformChaynsComponentsImports,
		transpileModules: transpileModules || false,
		reactRefreshSupport: reactRefreshSupport !== false,
	}
}
