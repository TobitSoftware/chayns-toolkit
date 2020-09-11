const sharedRules = {
	"import/extensions": [
		"error",
		"always",
		{ js: "never", jsx: "never", ts: "never", tsx: "never" },
	],
	"import/no-unresolved": ["error", { ignore: ["chayns-components"] }],
	"import/prefer-default-export": "off",
	"jsx-a11y/anchor-has-content": "off",
	"jsx-a11y/anchor-is-valid": "off",
	"jsx-a11y/click-events-have-key-events": "off",
	"jsx-a11y/heading-has-content": "off",
	"jsx-a11y/href-no-hash": "off",
	"jsx-a11y/no-noninteractive-element-interactions": "off",
	"jsx-a11y/no-static-element-interactions": "off",
	"no-console": ["warn", { allow: ["warn", "error"] }],
	"no-param-reassign": [
		"error",
		{ ignorePropertyModificationsFor: ["draft"], props: true },
	],
	"no-plusplus": "off",
	"no-restricted-imports": [
		"error",
		{
			message: "Use 'chayns-components' instead to enable tree-shaking.",
			name: "chayns-components/lib",
		},
	],
	"react/jsx-props-no-spreading": "off",
}

module.exports = sharedRules
