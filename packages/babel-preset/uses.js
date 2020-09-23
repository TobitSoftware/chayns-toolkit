const { usesPackageSync } = require("@chayns-toolkit/utilities")

module.exports = {
	usesTypeScript: usesPackageSync("typescript"),
	usesChaynsComponents: usesPackageSync("chayns-components"),
}
