module.exports = {
	development: {},
	output: {},
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
}
