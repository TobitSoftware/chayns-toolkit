import { JS_CONFIG_FILENAME } from "../features/config-file/loadConfig"
import { fm } from "./format"

interface ModifyWebpackConfigOptions {
	config
	modifier: WebpackModifierFunction
	dev: boolean
}

export function modifyWebpackConfig({ config, dev, modifier }: ModifyWebpackConfigOptions) {
	if (!modifier) return config
	const modifiedWebpackConfig = modifier(config, {
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
