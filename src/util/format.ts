import chalk from "chalk"

type TemplateStringsOrString = TemplateStringsArray | string

export const fm = {
	path(path: TemplateStringsOrString): string {
		return chalk.hex("#16BDCA")(`\`${getStringArg(path)}\``)
	},
	command(command: TemplateStringsOrString): string {
		return chalk.hex("#AC94FA")(`\`${getStringArg(command)}\``)
	},
	code(code: TemplateStringsOrString): string {
		return chalk.hex("#76A9FA")(`\`${getStringArg(code)}\``)
	},
	alt(text: TemplateStringsOrString): string {
		return chalk.hex("#97A6BA")(getStringArg(text))
	},
	number(number: string | number): string {
		return chalk.hex("#F17EB8")(number)
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
