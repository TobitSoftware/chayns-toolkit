const copyAssets = require("./copy-assets")
const esbuildConfig = require("./esbuildConfig")

copyAssets()

require("esbuild").build({
	...esbuildConfig,
	watch: true,
})
