const { dependencies, peerDependencies, version } = require("../package.json")

const esbuildConfig = {
	entryPoints: ["src/cli.ts"],
	bundle: true,
	platform: "node",
	target: ["node20"],
	external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
	outfile: "lib/cli.js",
	define: {
		__PKG_VERSION__: JSON.stringify(version),
	},
}

module.exports = esbuildConfig
