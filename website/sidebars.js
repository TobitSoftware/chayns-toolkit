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
				"features/module-federation",
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
				{
					type: "doc",
					id: "commands/test",
					label: "Test (legacy)",
				},
			],
		},
		{
			type: "category",
			label: "Configuration",
			collapsed: false,
			items: ["configuration/development", "configuration/output", "configuration/webpack"],
		},
		{
			type: "category",
			label: "Migrations",
			collapsed: false,
			items: ["migrations/overview", "migrations/v2-to-v3", "migrations/v3-to-v4"],
		},
		"contributing",
	],
}
