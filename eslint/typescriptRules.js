const typescriptRules = {
	"react/prop-types": "off",
	"react/require-default-props": "off",
	"@typescript-eslint/no-use-before-define": [
		"error",
		{ functions: false, classes: false, variables: false, enums: false },
	],
	"@typescript-eslint/ban-ts-comment": [
		"error",
		{
			"ts-expect-error": "allow-with-description",
			"ts-ignore": true,
			"ts-nocheck": true,
			"ts-check": true,
			minimumDescriptionLength: 4,
		},
	],
}

module.exports = typescriptRules
