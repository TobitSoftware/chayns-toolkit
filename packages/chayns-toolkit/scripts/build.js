const copyAssets = require("./copy-assets")
const esbuildConfig = require("./esbuildConfig")

copyAssets()

require("esbuild").buildSync({
	...esbuildConfig,
	minify: true,
})
