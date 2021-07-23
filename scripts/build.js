const copyAssets = require("./copyAssets")
const esbuildConfig = require("./esbuildConfig")

copyAssets()

require("esbuild").buildSync({
	...esbuildConfig,
	minify: true,
})
