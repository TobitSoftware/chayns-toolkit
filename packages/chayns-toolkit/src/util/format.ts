import chalk from "chalk"

type TemplateStringsOrString = TemplateStringsArray | string

export const fm = {
	path(path: TemplateStringsOrString): string {
		return chalk.blueBright(`\`${getStringArg(path)}\``)
	},
	command(command: TemplateStringsOrString): string {
		return chalk.magentaBright(`\`${getStringArg(command)}\``)
	},
	code(code: TemplateStringsOrString): string {
		return chalk.blueBright(`\`${getStringArg(code)}\``)
	},
}

function getStringArg(path: TemplateStringsArray | string): string {
	return isTemplateArray(path) ? path[0] : path
}

function isTemplateArray(
	value: TemplateStringsArray | string
): value is TemplateStringsArray {
	return Array.isArray(value)
}
