const resolveAbsoluteImport = require("chayns-components/lib/utils/babel/resolveAbsoluteImport")
const path = require("path")

module.exports = () => {
	const isProduction = process.env.NODE_ENV === "production"
	const isTest = process.env.NODE_ENV === "test"

	// eslint-disable-next-line
	const { dependencies } = require(path.resolve(
		process.cwd(),
		"./package.json"
	))

	const usesRecharts = Boolean(dependencies && dependencies.recharts)

	if (isTest) {
		return {
			presets: [["@babel/preset-env", { targets: { node: "current" } }]],
		}
	}

	return {
		presets: [
			["@babel/preset-env", { modules: false }],
			"@babel/preset-react",
			"@babel/preset-typescript",
		],
		plugins: [
			[
				"transform-imports",
				{
					"chayns-components": {
						transform: resolveAbsoluteImport,
						preventFullImport: true,
					},
				},
			],
			usesRecharts && "babel-plugin-recharts",
			"macros",
			"@babel/plugin-proposal-optional-chaining",
			"@babel/plugin-proposal-nullish-coalescing-operator",
			["@babel/plugin-proposal-class-properties", { loose: true }],
			isProduction && "@babel/plugin-transform-react-constant-elements",
			isProduction && "transform-react-remove-prop-types",
			!isProduction && "react-refresh/babel",
		].filter(Boolean),
		overrides: [
			{
				test: /\.tsx?$/,
				plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]],
			},
		],
	}
}
