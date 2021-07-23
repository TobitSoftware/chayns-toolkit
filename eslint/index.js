const path = require("path")
const javascriptRules = require("./rules/javascriptRules")
const sharedRules = require("./rules/sharedRules")
const typescriptRules = require("./rules/typescriptRules")

// eslint-disable-next-line import/no-dynamic-require
const packageJson = require(path.resolve("package.json"))

const usesTypeScript = Object.keys({
	...packageJson.dependencies,
	...packageJson.devDependencies,
}).includes("typescript")

module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: ["airbnb", "airbnb/hooks", "prettier"],
	globals: { chayns: true },
	rules: { ...sharedRules, ...javascriptRules },
	parser: "babel-eslint",
	settings: {
		"import/resolver": {
			typescript: { project: "@(jsconfig|tsconfig).json" },
		},
		"import/extensions": [".js", ".jsx", ".ts", ".tsx"],
	},
	overrides: [
		usesTypeScript && {
			files: ["**/*.ts?(x)"],
			extends: [
				"airbnb-typescript",
				"airbnb/hooks",
				"plugin:@typescript-eslint/recommended",
				"plugin:@typescript-eslint/recommended-requiring-type-checking",
				"prettier",
				"plugin:import/typescript",
			],
			rules: {
				...sharedRules,
				...typescriptRules,
			},
			parserOptions: {
				project: "./tsconfig.json",
			},
		},
		{
			files: ["**/*.@(test|spec).@(js|jsx|ts|tsx)"],
			env: { "jest/globals": true },
			plugins: ["jest"],
			rules: {
				...sharedRules,
				"jest/no-disabled-tests": "warn",
				"jest/no-focused-tests": "error",
				"jest/no-identical-title": "error",
				"jest/prefer-to-have-length": "warn",
				"jest/valid-expect": "error",
			},
		},
	].filter(Boolean),
}
