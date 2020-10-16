const getCacheIdentifier = require("./getCacheIdentifier")
const { usesTypeScript, usesChaynsComponents, usesFlow } = require("./uses")

module.exports = (api) => {
	api.cache.using(() => getCacheIdentifier())

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
			[
				"@babel/preset-react",
				{
					runtime: "automatic",
					development: !isProduction,
				},
			],
			usesFlow && "@babel/preset-flow",
			usesTypeScript && "@babel/preset-typescript",
		].filter(Boolean),
		plugins: [
			usesChaynsComponents && [
				"transform-imports",
				{
					"chayns-components": {
						// eslint-disable-next-line global-require
						transform: require("chayns-components/lib/utils/babel/resolveAbsoluteImport"),
						preventFullImport: true,
					},
				},
			],
			"macros",
			"optimize-clsx",
			[
				"@babel/plugin-transform-runtime",
				{
					// eslint-disable-next-line global-require
					version: require("@babel/runtime/package.json").version,
					corejs: false,
					regenerator: true,
				},
			],
			// This is included in preset-env, but we always want to compile it
			// since the resulting numbers are smaller.
			"@babel/plugin-proposal-numeric-separator",
			"@babel/plugin-proposal-optional-chaining",
			"@babel/plugin-proposal-nullish-coalescing-operator",
			usesTypeScript && ["@babel/plugin-proposal-decorators", { legacy: true }],
			["@babel/plugin-proposal-class-properties", { loose: true }],
			isProduction && "@babel/plugin-transform-react-constant-elements",
			isProduction && "transform-react-remove-prop-types",
			!isProduction && "react-refresh/babel",
		].filter(Boolean),
	}
}
