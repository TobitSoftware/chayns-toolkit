const esbuildConfig = require("./esbuildConfig")

require("esbuild")
	.context(esbuildConfig)
	.then((ctx) => ctx.watch())
