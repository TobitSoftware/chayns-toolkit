const { dependencies, version } = require("../package.json")

const esbuildConfig = {
	entryPoints: ["src/cli.ts"],
	bundle: true,
	platform: "node",
	target: ["node12"],
	external: [...Object.keys(dependencies), "react-devtools"],
	outfile: "lib/cli.js",
	define: {
		__PKG_VERSION__: JSON.stringify(version),
	},
}

module.exports = esbuildConfig
