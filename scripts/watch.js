const copyAssets = require("./copyAssets")
const esbuildConfig = require("./esbuildConfig")

copyAssets()

require("esbuild")
	.context(esbuildConfig)
	.then((ctx) => ctx.watch())
