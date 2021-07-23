const { copySync } = require("fs-extra")
const path = require("path")

module.exports = function copyAssets() {
	const assetPath = path.join(__dirname, "../src/assets")
	const assetOutputPath = path.join(__dirname, "../lib/assets")

	copySync(assetPath, assetOutputPath)
}
