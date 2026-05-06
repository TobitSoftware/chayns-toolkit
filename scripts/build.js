const esbuildConfig = require("./esbuildConfig")

require("esbuild").buildSync({
	...esbuildConfig,
	minify: true,
})
