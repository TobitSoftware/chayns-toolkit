import { fm } from "../../util/format"
import { PackageManager } from "../../util/getPackageManager"
import { output } from "../../util/output"
import { pkgCommands } from "../../util/pkgCommands"
import { usesPackage } from "../../util/usesPackage"

export async function checkForTypesPackages(
	packageManager: PackageManager | undefined
): Promise<void> {
	const hasReactTypes = await usesPackage("@types/react")
	const hasReactDOMTypes = await usesPackage("@types/react-dom")

	const missingPackages = [
		!hasReactTypes && "@types/react",
		!hasReactDOMTypes && "@types/react-dom",
	].filter(Boolean) as string[]

	if (missingPackages.length > 0) {
		const packages = missingPackages.map((p) => fm.code(p)).join(" and ")

		output.hint(
			`You should install the ${packages} package${
				missingPackages.length > 0 ? "s" : ""
			} to get TypeScript support for React.\n`
		)

		if (packageManager !== undefined) {
			output.blank(
				`Install them by running ${pkgCommands.install(
					packageManager,
					missingPackages,
					true
				)}`
			)
		}
	}
}
