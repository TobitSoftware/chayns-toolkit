module.exports = (api) => {
	if (!api.env("test"))
		throw Error("This babel config is only meant to be used for testing.")

	return {
		presets: [
			["@babel/env", { targets: { node: "current" } }],
			"@babel/typescript",
		],
	}
}
