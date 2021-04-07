const withNextra = require("nextra")("nextra-theme-docs", "./theme.config.js")

module.exports = withNextra({
	future: {
		webpack5: true,
	},
	basePath: "/chayns-toolkit",
})
