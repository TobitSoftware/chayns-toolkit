module.exports = {
	docs: [
		"getting-started",
		{
			type: "category",
			label: "Features",
			items: [
				"features/typescript",
				"features/css",
				"features/assets",
				"features/devtools",
				"features/eslint",
				"features/environment",
			],
		},
		{
			type: "category",
			label: "Commands",
			items: [
				"commands/dev",
				"commands/build",
				"commands/lint",
				"commands/test",
			],
		},
		{
			type: "category",
			label: "Configuration",
			items: [
				"configuration/development",
				"configuration/output",
				"configuration/webpack",
			],
		},
		"contributing",
	],
}
