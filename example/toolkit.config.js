module.exports = {
	development: {},
	output: {
		// prefixCss: true,
		// injectCssInPage: true,
		// exposeModules: {
		// 	"./AppWrapper": "./src/AppWrapper",
		// },
		// apiVersion: 5
	},
	webpack(config) {
		const babelRule = config.module.rules.find(
			(rule) =>
				rule.use.loader && rule.use.loader.includes("babel-loader")
		)

		if (!babelRule) return config

		const babelOptions = babelRule.use.options

		const pipelinePlugin = [
			"@babel/plugin-proposal-pipeline-operator",
			{ proposal: "smart" },
		]

		if (Array.isArray(babelOptions.plugins)) {
			babelOptions.plugins.push(pipelinePlugin)
		} else {
			babelOptions.plugins = [pipelinePlugin]
		}

		return config
	},
	jest(config) {
		config.transformIgnorePatterns = [
			// required for node_modules with es6 syntax
			"/node_modules/(?!lodash-es).+\\.js$",
		]

		return config
	},
	webpackDev(config) {
		return config
	},
}
