const copyAssets = require("./copyAssets")
const esbuildConfig = require("./esbuildConfig")

copyAssets()

require("esbuild").build({
	...esbuildConfig,
	watch: true,
})
