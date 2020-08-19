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
			isProduction && "@babel/plugin-transform-react-constant-elements",
			isProduction && "transform-react-remove-prop-types",
			[
				"transform-imports",
				{
					"chayns-components": {
						transform:
							"chayns-components/lib/utils/babel/resolveAbsoluteImport.js",
						preventFullImport: true,
					},
				},
			],
		].filter(Boolean),
	}
}
