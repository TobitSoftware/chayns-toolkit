const { declare } = require("@babel/helper-plugin-utils")

module.exports = declare((api, options) => {
	api.assertVersion(7)

	const env = process.env.BABEL_ENV || process.env.NODE_ENV

	const {
		typescriptSupport = false,
		flowSupport = false,
		transpileModules = false,
		reactRefreshSupport = true,
	} = options

	if (env === "test") {
		return { presets: [["@babel/env", { targets: { node: "current" } }]] }
	}

	return {
		presets: [
			[
				"@babel/env",
				{
					loose: true,
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
			typescriptSupport && [
				"@babel/proposal-decorators",
				{ legacy: true },
			],
			env === "production" && "transform-react-remove-prop-types",
			reactRefreshSupport &&
				env !== "production" &&
				"react-refresh/babel",
			[
				"@babel/plugin-transform-spread",
				{
					loose: false,
				},
			],
		].filter(Boolean),
	}
})
