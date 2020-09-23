const { usesChaynsComponents, usesTypeScript } = require("./uses")

module.exports = () =>
	[
		process.env.NODE_ENV,
		usesChaynsComponents && "chayns-components",
		usesTypeScript && "typescript",
	]
		.filter(Boolean)
		.join("--")
