const {
	usesPackageSync,
	resolveProjectPath,
} = require("@chayns-toolkit/utilities")
const { existsSync } = require("fs")

module.exports = {
	usesTypeScript: usesPackageSync("typescript"),
	usesChaynsComponents: usesPackageSync("chayns-components"),
	usesFlow: existsSync(resolveProjectPath(".flowconfig")),
}
