/* eslint-disable */
import { type PostCSSOptions } from "@rsbuild/core/dist-types/types"
import { pluginReact } from "@rsbuild/plugin-react"
import { pluginSass } from "@rsbuild/plugin-sass"
import { pluginCssMinimizer } from "@rsbuild/plugin-css-minimizer"
import { pluginAssetsRetry } from "@rsbuild/plugin-assets-retry"
import { pluginSvgr } from "@rsbuild/plugin-svgr"
import { loadEnv, Rspack, RsbuildEntry } from "@rsbuild/core"
import HtmlWebpackPlugin from "html-webpack-plugin"
import HtmlWebpackTagsPlugin from "html-webpack-tags-plugin"
import type { PackageJson } from "type-fest"
import { project } from "./project"
import { getCssTag } from "./loadChaynsCss"
import type { RsbuildConfig } from "@rsbuild/core/dist-types/types/config"

import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack"
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill"

const getDefaultFilename = () =>
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
	pathHtml?: string
	pathIndex: string
	templateParameters?: {
		[key: string]: string
	}
}

type EntryPoints = {
	[key: string]: EntryPoint
}

interface CreateConfigOptions {
	mode: Mode
	analyze: boolean
	singleBundle: boolean
	serverSideRendering: boolean
	outputFilename?: {
		html?: string
		js?: string
		css?: string
		svg?: string
		font?: string
		image?: string
		media?: string
	}
	path?: string
	packageJson: PackageJson
	injectDevtoolsScript?: boolean
	prefixCss?: boolean
	cssVersion?: string
	exposeModules?: {}
	entryPoints: EntryPoints
	target: "client" | "server" | null
}

export async function createWebpackConfig({
	mode,
	analyze,
	outputFilename,
	injectDevtoolsScript,
	path: outputPath,
	packageJson,
	prefixCss = false,
	cssVersion = "4.2",
	exposeModules,
	entryPoints,
	target,
	serverSideRendering,
}: CreateConfigOptions): Promise<RsbuildConfig> {
	const packageName = packageJson.name
	const buildEnv = process.env.BUILD_ENV || (mode === "production" ? "production" : "development")

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

	Object.entries(entryPoints).forEach(([k, { pathHtml, pathIndex, templateParameters }]) => {
		entries[k] = pathIndex
		if (pathHtml) {
			plugins.push(
				new HtmlWebpackPlugin({
					template: pathHtml,
					filename: `${k}.html`,
					chunks: [k],
					templateParameters: {
						CHAYNS_TOOLKIT_CSS_TAG: getCssTag(cssVersion),
						...templateParameters,
					},
				}),
			)
		}
	})

	if (injectDevtoolsScript && target !== "server") {
		plugins.push(
			new HtmlWebpackTagsPlugin({
				scripts: ["http://localhost:8097"],
				append: false,
			}),
		)
	}

	if (!packageName) throw Error("The name field in package.json has to be provided.")

	if (exposeModules) {
		if (Object.keys(entries).length === 0) {
			// override default index-entry when using exposeModules without
			// entrypoints, to avoid the need of a useless/empty index.js
			entries.index = undefined!
		}
		const shared: ConstructorParameters<typeof ModuleFederationPlugin>[0]["shared"] = {
			react: {
				requiredVersion:
					packageJson.peerDependencies?.react || packageJson?.dependencies?.react,
			},
			"react-dom": {
				requiredVersion:
					packageJson.peerDependencies?.["react-dom"] ||
					packageJson?.dependencies?.["react-dom"],
			},
		}

		try {
			require.resolve("react-dom/client", { paths: [project.resolvePath("node_modules")] })
			shared["react-dom/client"] = shared["react-dom"]
		} catch (ex) {
			//
		}

		const moduleFederationConfig = {
			dts: false,
			manifest: false,
			name: packageName?.split("-").join("_"),
			filename: "v2.remoteEntry.js",
			runtimePlugins:
				target === "server"
					? [require.resolve("@module-federation/node/runtimePlugin")]
					: undefined,
			exposes: exposeModules,
			library: target === "server" ? { type: "commonjs-module" } : undefined,
			shared: mode !== "development" ? shared : undefined,
		}
		plugins.push(new ModuleFederationPlugin(moduleFederationConfig))
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
		// @ts-expect-error missing in types
		context: {
			rootPath: project.resolvePath("."),
		},
		source: {
			tsconfigPath: project.hasFile("tsconfig.json")
				? project.resolvePath("tsconfig.json")
				: undefined,
			define: {
				"process.env.VERSION": JSON.stringify(process.env.BUILD_VERSION || 1),
				"import.meta.env.VERSION": JSON.stringify(process.env.BUILD_VERSION || 1),
				"process.env.BUILD_VERSION": JSON.stringify(process.env.BUILD_VERSION || 1),
				"import.meta.env.BUILD_VERSION": JSON.stringify(process.env.BUILD_VERSION || 1),
				"process.env.BUILD_ENV": JSON.stringify(buildEnv),
				"import.meta.env.BUILD_ENV": JSON.stringify(buildEnv),
				"process.env.__PACKAGE_NAME__": JSON.stringify(
					packageJson.name?.replace(/-/g, "_"),
				),
				"import.meta.env.__PACKAGE_NAME__": JSON.stringify(
					packageJson.name?.replace(/-/g, "_"),
				),
				__REQUIRED_REACT_VERSION__: JSON.stringify(
					packageJson.peerDependencies?.react || packageJson?.dependencies?.react,
				),
				...publicVars,
			},
			entry: entries,
		},
		plugins: rsBuildPlugins,
		tools: {
			rspack: {
				resolve: {
					fallback: {
						"react-dom/client": false,
					},
				},
				output: {
					uniqueName: exposeModules
						? `${packageName}__${buildEnv}__${process.env.BUILD_VERSION || 1}`
						: packageName,
				},
				plugins,
				module: {
					parser: {
						javascript: {
							exportsPresence: "warn",
						},
					},
				},
			},
			htmlPlugin: false,
			postcss: prefixCss
				? (opts) => {
						if (!opts.postcssOptions) {
							return
						}
						const modifyOptions = (options: PostCSSOptions) => {
							if (!options.plugins) {
								options.plugins = []
							}
							options.plugins.push(
								require("postcss-prefix-selector")({
									prefix: `.${packageName}`,
									ignoreFiles: [/\.module\.s?css$/i],
								}),
							)
						}
						if (typeof opts.postcssOptions === "function") {
							const originalOptions = opts.postcssOptions
							opts.postcssOptions = (context) => {
								const options = originalOptions(context)
								modifyOptions(options)
								return options
							}
							return
						}
						modifyOptions(opts.postcssOptions)
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
			filename: { ...getDefaultFilename(), ...outputFilename },
			distPath: {
				root: outputPath || "build",
			},
		},
		dev: {
			assetPrefix: "auto",
		},
	}
}
