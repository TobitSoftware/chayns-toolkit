import { fm } from "../../util/format"
import { output } from "../../util/output"
import { project } from "../../util/project"

export async function convertConfigFile(): Promise<void> {
	const hasJsonConfig = project.hasFile("chayns-toolkit.json")

	if (hasJsonConfig) {
		const configContent = await project.readFile("chayns-toolkit.json")

		await Promise.all([
			project.writeFile(
				"toolkit.config.js",
				`${jsConfigTemplate}${configContent?.trim() ?? ""};`
			),
			project.deleteFile("chayns-toolkit.json"),
		])

		output.info(
			`The configuration format for ${fm.code`chayns-toolkit`} has changed and your old ${fm.path`chayns-toolkit.json`} file has been converted into the new ${fm.path`toolkit.config.js`} format.`
		)
	}
}

const jsConfigTemplate = `/**
* Your \`chayns-toolkit.json\`-file was automatically converted into this
* JavaScript configuration file, which will be the configuration format going
* forward.
*/

module.exports = `
