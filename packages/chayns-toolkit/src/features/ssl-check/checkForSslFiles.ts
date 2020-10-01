import * as fs from "fs"
import { fm } from "../../util/format"
import { output } from "../../util/output"
import { ChaynsScriptsConfiguration } from "../config-file/configSchema"
import { loadConfig } from "../config-file/loadConfig"

export async function checkSslPaths(): Promise<void> {
	let config: ChaynsScriptsConfiguration

	try {
		config = await loadConfig()
	} catch (e) {
		output.error(e)
		process.exit(1)
	}

	const { cert, key } = config.development

	if (key) {
		const keyExists = fs.existsSync(key)
		if (!keyExists) {
			output.error(
				`No file exists at the ${fm.code`key`} path specified in ${fm.path`chayns-toolkit.json`}.`
			)
			output.exit(1)
		}
	}

	if (cert) {
		const crtExists = fs.existsSync(cert)
		if (!crtExists) {
			output.error(
				`No file exists at the ${fm.code`cert`} path specified in ${fm.path`chayns-toolkit.json`}.`
			)
			output.exit(1)
		}
	}
}
