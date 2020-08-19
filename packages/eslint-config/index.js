module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: ["airbnb", "airbnb/hooks", "prettier", "prettier/react"],
	globals: { chayns: true },
	// parser: "babel-eslint",
	rules: {
		"import/no-unresolved": ["error", { ignore: ["chayns-components"] }],
		"import/prefer-default-export": "off",
		"no-console": ["warn", { allow: ["warn", "error"] }],
		"no-param-reassign": [
			"error",
			{ ignorePropertyModificationsFor: ["draft"], props: true },
		],
		"no-restricted-imports": [
			"error",
			{
				message: "Use 'chayns-components' instead to enable tree-shaking.",
				name: "chayns-components/lib",
			},
		],
		"no-use-before-define": ["error", "nofunc"],
	},
	settings: {
		"import/resolver": {
			node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
		},
	},
}
