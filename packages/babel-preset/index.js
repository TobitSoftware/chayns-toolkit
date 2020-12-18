const { declare } = require("@babel/helper-plugin-utils")

module.exports = declare((api, options) => {
	api.assertVersion(7)

	const env = process.env.BABEL_ENV || process.env.NODE_ENV

	const {
		typescriptSupport = false,
		flowSupport = false,
		transformChaynsComponentsImports = true,
		transpileModules = false
	} = options

	if (env === "test") {
		return { presets: [["@babel/env", { targets: { node: "current" } }]] }
	}

	return {
		presets: [
			[
				"@babel/env",
				{
					bugfixes: true,
					modules: transpileModules,
					exclude: ["transform-typeof-symbol"],
					useBuiltIns: "usage",
					corejs: 3,
				},
			],
			[
				"@babel/react",
				{
					runtime: "automatic",
					development: env !== "production",
				},
			],
			flowSupport && "@babel/flow",
			typescriptSupport && "@babel/typescript",
		].filter(Boolean),
		plugins: [
			transformChaynsComponentsImports && [
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
				"@babel/transform-runtime",
				{
					// eslint-disable-next-line global-require
					version: require("@babel/runtime/package.json").version,
					corejs: false,
					regenerator: true,
				},
			],
			// This is included in preset-env, but we always want to compile it
			// since the resulting numbers are smaller.
			"@babel/proposal-numeric-separator",
			"@babel/proposal-optional-chaining",
			"@babel/proposal-nullish-coalescing-operator",
			typescriptSupport && ["@babel/proposal-decorators", { legacy: true }],
			["@babel/proposal-class-properties", { loose: true }],
			env === "production" && "@babel/transform-react-constant-elements",
			env === "production" && "transform-react-remove-prop-types",
			env !== "production" && "react-refresh/babel",
		].filter(Boolean),
	}
})
