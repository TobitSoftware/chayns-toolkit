/* eslint-disable @typescript-eslint/no-unsafe-call */
import { usesPackage } from "@chayns-toolkit/utilities"
import chalk from "chalk"
import { getPackageManager } from "../../util/getPackageManager"
import { output } from "../../util/output"
import { extraneousPackages } from "./extraneousPackages"

export async function checkPackages(): Promise<void> {
	const packages = await usesPackage(extraneousPackages)

	if (packages.length > 0) {
		const packageManager = getPackageManager()

		output.warn(`You have extraneous packages installed:`)
		output.blank(chalk.rgb(125, 125, 140)(packages.join(" ")))

		if (packageManager !== undefined) {
			output.blank("")
			output.blank(
				`You can remove these packages by running ${chalk.blueBright(
					`\`${packageManager} remove ${chalk.blueBright(packages.join(" "))}\``
				)}.`
			)
		}
	}
}
