const resolveAbsoluteImport = require("chayns-components/lib/utils/babel/resolveAbsoluteImport")

module.exports = () => {
	const isProduction = process.env.NODE_ENV === "production"
	const isTest = process.env.NODE_ENV === "test"

	if (isTest) {
		return {
			presets: [["@babel/preset-env", { targets: { node: "current" } }]],
		}
	}

	return {
		presets: [
			[
				"@babel/preset-env",
				{
					bugfixes: true,
					modules: false,
					exclude: ["transform-typeof-symbol"],
					useBuiltIns: "usage",
					corejs: 3,
				},
			],
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
			"macros",
			[
				"@babel/plugin-transform-runtime",
				// eslint-disable-next-line global-require
				{ version: require("@babel/runtime/package.json").version },
			],
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
