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
	transpileModules: boolean | "commonjs"
	reactRefreshSupport: boolean
}

export default function createBabelPresetOptions({
	packageJson,
	transpileModules = false,
	reactRefreshSupport = true,
}: CreateConfigOptions): BabelPresetOptions {
	return {
		typescriptSupport: isPackageInstalled(packageJson, "typescript"),
		flowSupport: project.hasFile(".flowconfig"),
		transpileModules: transpileModules || false,
		reactRefreshSupport: reactRefreshSupport !== false,
	}
}
