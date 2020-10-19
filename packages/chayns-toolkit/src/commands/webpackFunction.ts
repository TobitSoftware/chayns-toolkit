import type webpack from "webpack"

export type WebpackModifierFunction = (
	config: webpack.Configuration,
	options: { webpack: typeof webpack; dev: boolean }
) => webpack.Configuration
