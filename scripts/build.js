const copyAssets = require("./copyAssets")
const esbuildConfig = require("./esbuildConfig")

copyAssets()

require("esbuild").buildSync({
	...esbuildConfig,
	minify: true,
})

require("esbuild").buildSync({
	entryPoints: ["src/eslint/index.js"],
	bundle: true,
	platform: "node",
	target: ["node12"],
	outfile: "lib/eslint.js",
})
