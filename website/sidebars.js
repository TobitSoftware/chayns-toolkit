module.exports = {
	docs: [
		"getting-started",
		{
			type: "category",
			label: "Features",
			collapsed: false,
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
			collapsed: false,
			items: [
				"commands/dev",
				"commands/build",
				"commands/lint",
				"commands/serve",
				"commands/test",
			],
		},
		{
			type: "category",
			label: "Configuration",
			collapsed: false,
			items: ["configuration/development", "configuration/output", "configuration/webpack"],
		},
		"contributing",
	],
}
