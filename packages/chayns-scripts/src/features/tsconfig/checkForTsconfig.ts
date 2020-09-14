import * as fs from "fs"
import * as path from "path"
import { defaultTsconfig } from "../../util/defaultTsconfig"

export function setupTsconfig(): void {
	fs.writeFileSync(
		path.resolve(process.cwd(), "tsconfig.json"),
		JSON.stringify(defaultTsconfig, undefined, 4)
	)

	// eslint-disable-next-line no-console
	console.log(
		"\nIt seems like you want to use TypeScript in this project. I went ahead and set up a tsconfig.json file for you.\n\n"
	)
}

export function checkForTsconfig(): boolean {
	const hasTsconfig = fs.existsSync(
		path.resolve(process.cwd(), "tsconfig.json")
	)

	if (hasTsconfig) {
		const tsconfig = fs.readFileSync("tsconfig.json", "utf8")

		const trimmedTsconfig = tsconfig.replace(/\s/g, "")

		if (trimmedTsconfig === "" || trimmedTsconfig === "{}") {
			setupTsconfig()
			return true
		}
	}

	return false
}
