const { usesChaynsComponents, usesTypeScript, usesFlow } = require("./uses")

module.exports = () =>
	[
		process.env.NODE_ENV,
		usesChaynsComponents && "chayns-components",
		usesTypeScript && "typescript",
		usesFlow && "flow",
	]
		.filter(Boolean)
		.join("--")
