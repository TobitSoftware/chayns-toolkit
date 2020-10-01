import { fm } from "../../util/format"
import { isPackageInstalled } from "../../util/isPackageInstalled"
import { output } from "../../util/output"
import { pkgCommands } from "../../util/pkgCommands"
import { StepParams } from "../../util/runSteps"
import { extraneousPackages } from "./extraneousPackages"

export function checkPackages({
	packageJson,
	packageManager,
}: StepParams): void {
	const packages = isPackageInstalled(packageJson, extraneousPackages)

	if (packages.length > 0) {
		output.warn(`You have extraneous packages installed:`)
		output.blank(fm.alt(packages.join(", ")))

		if (packageManager !== undefined) {
			output.blank("")
			output.blank(
				`You can remove these packages by running ${pkgCommands.remove(
					packageManager,
					packages
				)}.`
			)
		}
	}
}
