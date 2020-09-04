const rules = {
	"import/extensions": [
		"error",
		"always",
		{ js: "never", jsx: "never", ts: "never", tsx: "never" },
	],
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
}

module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: ["airbnb", "airbnb/hooks", "prettier", "prettier/react"],
	globals: { chayns: true },
	rules,
	parser: "babel-eslint",
	parserOptions: {
		babelOptions: {
			extends: "@chayns-scripts",
		},
	},
	settings: {
		"import/resolver": {
			node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
		},
		"import/extensions": [".js", ".jsx", ".ts", ".tsx"],
	},
	overrides: [
		{
			files: ["**/*.ts?(x)"],
			extends: [
				"airbnb-typescript",
				"airbnb/hooks",
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/recommended-requiring-type-checking",
				"prettier",
				"prettier/@typescript-eslint",
				"prettier/react",
			],
			rules,
			parserOptions: {
				project: "./tsconfig.json",
			},
		},
	],
}
