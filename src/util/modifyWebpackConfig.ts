import type { RsbuildConfig } from "@rsbuild/core"
import { usedConfigFilename } from "../features/config-file/loadConfig"
import { fm } from "./format"

interface ModifyWebpackConfigOptions {
	config: RsbuildConfig
	modifier: WebpackModifierFunction
	dev: boolean
	watch: boolean
}

export function modifyWebpackConfig({ config, dev, modifier, watch }: ModifyWebpackConfigOptions) {
	if (!modifier || !usedConfigFilename) return config
	const modifiedWebpackConfig = modifier(config, {
		dev,
		watch,
	})

	if (modifiedWebpackConfig === undefined) {
		throw Error(
			`The webpack customization function in your ${fm.path(
				usedConfigFilename,
			)} returned nothing.`,
		)
	}
	if (typeof modifiedWebpackConfig !== "object") {
		throw Error(
			`The webpack customization function in your ${fm.path(
				usedConfigFilename,
			)} returned an invalid configuration.`,
		)
	}

	return modifiedWebpackConfig
}

export type WebpackModifierFunction = (
	config: RsbuildConfig,
	options: { dev: boolean; watch: boolean },
) => RsbuildConfig
