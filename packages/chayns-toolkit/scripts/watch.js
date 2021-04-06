const esbuildConfig = require("./esbuildConfig")

require("esbuild").build({
	...esbuildConfig,
	watch: true,
})
