import { RsbuildConfig } from "@rsbuild/core/dist-types/types/config"
import { usedConfigFilename } from "../features/config-file/loadConfig"
import { fm } from "./format"

interface ModifyWebpackConfigOptions {
	config: RsbuildConfig
	modifier: WebpackModifierFunction
	dev: boolean
	target: "server" | "client" | null
	watch: boolean
}

export function modifyWebpackConfig({
	config,
	dev,
	modifier,
	target,
	watch,
}: ModifyWebpackConfigOptions) {
	if (!modifier || !usedConfigFilename) return config
	const modifiedWebpackConfig = modifier(config, {
		dev,
		target,
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
	options: { dev: boolean; target: "server" | "client" | null; watch: boolean },
) => RsbuildConfig
