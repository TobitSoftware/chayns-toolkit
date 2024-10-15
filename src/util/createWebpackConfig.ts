/* eslint-disable */
import { pluginReact } from "@rsbuild/plugin-react"
import { pluginSass } from "@rsbuild/plugin-sass"
import { pluginCssMinimizer } from "@rsbuild/plugin-css-minimizer"
import { pluginAssetsRetry } from "@rsbuild/plugin-assets-retry"
import { pluginSvgr } from "@rsbuild/plugin-svgr"
import { loadEnv, Rspack, RsbuildEntry } from "@rsbuild/core"
import HtmlWebpackPlugin from "html-webpack-plugin"
import type { PackageJson } from "type-fest"
import { project } from "./project"
import { loadCss } from "./loadChaynsCss"
import type { RsbuildConfig } from "@rsbuild/core/dist-types/types/config"

import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack"
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill"

const prodDefaultFilename =
	process.env.NODE_ENV === "production"
		? {
				html: "[name].html",
				js: "[name].[contenthash:8].im.js",
				css: "[name].[contenthash:8].im.css",
				svg: "[name].[contenthash:8].im.svg",
				font: "[name].[contenthash:8].im[ext]",
				image: "[name].[contenthash:8].im[ext]",
				media: "[name].[contenthash:8].im[ext]",
		  }
		: {}

type Mode = "development" | "production" | "none"

export type EntryPoint = {
	pathHtml: string
	pathIndex: string
	templateParameters: {
		title: string
	}
}

type EntryPoints = {
	[key: string]: EntryPoint
} & { [key in keyof any]: EntryPoint }

interface CreateConfigOptions {
	mode: Mode
	analyze: boolean
	singleBundle: boolean
	serverSideRendering: boolean
	outputFilename: {
		html: string
		js: string
		css: string
		svg: string
		font: string
		image: string
		media: string
	}
	path?: string
	packageJson: PackageJson
	injectDevtoolsScript?: boolean
	prefixCss?: boolean
	exposeModules?: {}
	entryPoints: EntryPoints
	target: "client" | "server" | null
}

export async function createWebpackConfig({
	mode,
	analyze,
	outputFilename,
	path: outputPath,
	packageJson,
	prefixCss = false,
	exposeModules,
	entryPoints,
	target,
	serverSideRendering,
}: CreateConfigOptions): Promise<RsbuildConfig> {
	const packageName = packageJson.name
	const buildEnv = mode === "production" ? process.env.BUILD_ENV || "production" : "development"

	const { parsed, publicVars } = loadEnv({
		mode: buildEnv,
	})

	const plugins: Rspack.Configuration["plugins"] = []
	const rsBuildPlugins = [
		pluginReact(),
		pluginSass(),
		pluginAssetsRetry(),
		pluginCssMinimizer(),
		pluginSvgr({
			svgrOptions: {
				exportType: "default",
			},
		}),
	]

	if (serverSideRendering && target === "client") {
		rsBuildPlugins.push(pluginNodePolyfill())
	}

	const entries: RsbuildEntry = {}

	Object.entries(entryPoints).forEach(([k, { pathHtml, pathIndex, templateParameters = {} }]) => {
		entries[k] = pathIndex
		if (pathHtml) {
			plugins.push(
				new HtmlWebpackPlugin({
					template: pathHtml,
					filename: `${k}.html`,
					chunks: [k],
					templateParameters: {
						CHAYNS_TOOLKIT_CSS_TAG: `<script>(${loadCss.toString()})()</script>`,
						...templateParameters,
					},
				})
			)
		}
	})

	if (!packageName) throw Error("The name field in package.json has to be provided.")

	let moduleFederationConfig = undefined

	if (exposeModules) {
		moduleFederationConfig = {
			options: {
				name: packageName?.split("-").join("_"),
				filename: "remoteEntry.js",
				runtimePlugins:
					target === "server"
						? [require.resolve("@module-federation/node/runtimePlugin")]
						: undefined,
				exposes: exposeModules,
				library: target === "server" ? { type: "commonjs-module" } : undefined,
				shared:
					mode !== "development"
						? {
								react: {
									requiredVersion:
										packageJson.peerDependencies?.react ||
										packageJson?.dependencies?.react,
								},
								"react-dom": {
									requiredVersion:
										packageJson.peerDependencies?.["react-dom"] ||
										packageJson?.dependencies?.["react-dom"],
								},
						  }
						: undefined,
			},
		}
		plugins.push(new ModuleFederationPlugin(moduleFederationConfig.options))
	}
	return {
		performance:
			parsed.BUNDLE_ANALYZE === "true" || analyze
				? {
						bundleAnalyze: {
							analyzerMode: "server",
							openAnalyzer: true,
						},
				  }
				: undefined,
		context: {
			rootPath: project.resolvePath("."),
		},
		source: {
			tsconfigPath: project.hasFile("tsconfig.json")
				? project.resolvePath("tsconfig.json")
				: undefined,
			define: {
				"process.env.VERSION": JSON.stringify(process.env.BUILD_VERSION || 1),
				"process.env.BUILD_ENV": JSON.stringify(buildEnv),
				__REQUIRED_REACT_VERSION__: JSON.stringify(
					packageJson.peerDependencies?.react || packageJson?.dependencies?.react
				),
				"process.env.__PACKAGE_NAME__": JSON.stringify(
					packageJson.name?.replace(/-/g, "_")
				),
				...publicVars,
			},
			entry: entries,
		},
		plugins: rsBuildPlugins,
		tools: {
			rspack: {
				output: {
					uniqueName: packageName,
				},
				plugins,
			},
			htmlPlugin: false,
			postcss: prefixCss
				? (opts) => {
						if (!opts.postcssOptions) {
							return
						}
						if (!opts.postcssOptions.plugins) {
							opts.postcssOptions.plugins = []
						}
						opts.postcssOptions.plugins.push(
							require("postcss-prefix-selector")({
								prefix: `.${packageName}`,
							})
						)
				  }
				: undefined,
		},
		output: {
			target: target === "server" ? "node" : "web",
			sourceMap: {
				js: mode === "development" ? "cheap-module-source-map" : "hidden-source-map",
			},
			cleanDistPath: mode === "production",
			assetPrefix: target === "server" ? undefined : "auto",
			overrideBrowserslist:
				mode === "production"
					? ["cover 90%", "not dead", "not op_mini all", "Firefox ESR", "not android < 5"]
					: undefined,
			filename: outputFilename || prodDefaultFilename,
			distPath: {
				root: outputPath || "build",
			},
		},
		dev: {
			assetPrefix: "auto",
		},
	}
}
