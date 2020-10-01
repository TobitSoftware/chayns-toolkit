import * as fs from "fs"
import { fm } from "../../util/format"
import { output } from "../../util/output"
import { StepParams } from "../../util/runSteps"

export function checkSSLConfig({ config }: StepParams): boolean {
	const { cert, key } = config.development

	let returnValue = false

	if ((key && !cert) || (!key && cert)) {
		output.error(
			`You have specified the ${fm.code(
				key ? "key" : "cert"
			)} field in your ${fm.path`chayns-toolkit.json`} file, but not ${fm.code(
				!key ? "key" : "cert"
			)}. You need to specify paths in both fields for SSL to work.`
		)
		returnValue = true
	} else {
		if (key) {
			const keyExists = fs.existsSync(key)
			if (!keyExists) {
				output.error(
					`No file exists at the ${fm.code`key`} path specified in ${fm.path`chayns-toolkit.json`}.`
				)
				returnValue = true
			}
		}

		if (cert) {
			const crtExists = fs.existsSync(cert)
			if (!crtExists) {
				output.error(
					`No file exists at the ${fm.code`cert`} path specified in ${fm.path`chayns-toolkit.json`}.`
				)
				returnValue = true
			}
		}
	}

	return returnValue
}
