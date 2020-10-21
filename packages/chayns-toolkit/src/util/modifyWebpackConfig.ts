import webpack, { Configuration } from "webpack"
import { fm } from "../../lib/util/format"
import { JS_CONFIG_FILENAME } from "../features/config-file/loadConfig"

interface ModifyWebpackConfigOptions {
	config: Configuration
	modifier: WebpackModifierFunction
	dev: boolean
}

export function modifyWebpackConfig({
	config,
	dev,
	modifier,
}: ModifyWebpackConfigOptions): Configuration {
	const modifiedWebpackConfig = modifier(config, {
		webpack,
		dev,
	})

	if (modifiedWebpackConfig === undefined) {
		throw Error(
			`The webpack customization function in your ${fm.path(
				JS_CONFIG_FILENAME
			)} returned nothing.`
		)
	}
	if (typeof modifiedWebpackConfig !== "object") {
		throw Error(
			`The webpack customization function in your ${fm.path(
				JS_CONFIG_FILENAME
			)} returned an invalid configuration.`
		)
	}

	return modifiedWebpackConfig
}

export type WebpackModifierFunction = (
	config: webpack.Configuration,
	options: { webpack: typeof webpack; dev: boolean }
) => webpack.Configuration
