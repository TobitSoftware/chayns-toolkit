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
		presets: [["@babel/preset-env", { modules: false }], "@babel/preset-react"],
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
			isProduction && "@babel/plugin-transform-react-constant-elements",
			isProduction && "transform-react-remove-prop-types",
		].filter(Boolean),
	}
}
