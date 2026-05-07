/* eslint-disable */
import { moduleFederationPlugin } from "@module-federation/enhanced"
import {
	type HtmlTagDescriptor,
	type PostCSSOptions,
	type RsbuildConfig,
	type ToolsConfig,
} from "@rsbuild/core"
import { pluginReact } from "@rsbuild/plugin-react"
import { pluginSass } from "@rsbuild/plugin-sass"
import { pluginCssMinimizer } from "@rsbuild/plugin-css-minimizer"
import { pluginAssetsRetry } from "@rsbuild/plugin-assets-retry"
import { pluginSvgr } from "@rsbuild/plugin-svgr"
import { loadEnv, Rspack, RsbuildEntry } from "@rsbuild/core"
import type { PackageJson } from "type-fest"
import { isPackageInstalled } from "./isPackageInstalled"
import { project } from "./project"
import { getCssTag } from "./loadChaynsCss"

import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack"
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill"
import { pluginBabel } from "@rsbuild/plugin-babel"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"

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
	reactRuntime?: "automatic" | "classic"
	reactCompiler?:
		| boolean
		| {
				target?: string
		  }
	disableReactSharing?: boolean
	manifest?: {
		host?: boolean
		module?: boolean
		externalAssets?: string[]
		textStringLibraries?: string[]
	}
}

function getReactCompilerTarget(packageJson: PackageJson, targetOverride?: string): string {
	if (targetOverride) {
		return targetOverride
	}

	const reactVersion =
		packageJson.dependencies?.react ??
		packageJson.peerDependencies?.react ??
		packageJson.devDependencies?.react

	return reactVersion?.match(/\d+/)?.[0] ?? "18"
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
	reactRuntime,
	reactCompiler,
	disableReactSharing = false,
	manifest = {},
}: CreateConfigOptions): Promise<RsbuildConfig> {
	const packageName = packageJson.name
	const buildEnv = process.env.BUILD_ENV || (mode === "production" ? "production" : "development")
	const buildVersion =
		process.env.BUILD_VERSION || `${buildEnv}-fallback-${new Date().toISOString()}`

	const { parsed, publicVars } = loadEnv({
		mode: buildEnv,
	})

	const isLinariaUsed = isPackageInstalled(packageJson, "@linaria/core")
	const isReactCompilerInstalled = isPackageInstalled(packageJson, "babel-plugin-react-compiler")

	const isReactCompilerEnabled =
		typeof reactCompiler === "boolean"
			? reactCompiler
			: reactCompiler !== undefined
				? true
				: isReactCompilerInstalled

	const reactCompilerTarget =
		typeof reactCompiler === "object" && reactCompiler !== null
			? reactCompiler.target
			: undefined

	const plugins: Rspack.Configuration["plugins"] = []
	const rsBuildPlugins = [
		pluginReact({
			swcReactOptions: {
				runtime: reactRuntime,
			},
		}),
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

	if (parsed.BUNDLE_ANALYZE === "true" || analyze) {
		plugins.push(new BundleAnalyzerPlugin())
	}

	const entries: RsbuildEntry = {}

	Object.entries(entryPoints).forEach(([k, { pathHtml, pathIndex }]) => {
		if (pathHtml) {
			entries[k] = pathIndex
		} else {
			entries[k] = { import: pathIndex, html: false }
		}
	})

	if (!packageName) throw Error("The name field in package.json has to be provided.")

	if (exposeModules) {
		if (Object.keys(entries).length === 0) {
			// Override the default index entry when using exposeModules without
			// explicit entry points, so that an empty or unnecessary index.js file
			// is not required.
			entries.index = { import: undefined!, html: false }
		}
		// The shareScope must not be manually set here.
		// Setting it would prevent this module from consuming shared dependencies.
		// Consuming modules always use the default share scope.
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
			manifest: manifest?.module
				? {
						additionalData: (options) => {
							if (manifest?.externalAssets) {
								;(options.stats.metaData as any).externalAssets =
									manifest.externalAssets
							}
							if (manifest?.textStringLibraries) {
								;(options.stats.metaData as any).textStringLibraries =
									manifest.textStringLibraries
							}
							options.stats.metaData.buildInfo.buildVersion = buildVersion
						},
					}
				: false,
			name: packageName?.replace(/^@/, "").replace(/\//g, "__").replace(/-/g, "_"),
			filename: "v2.remoteEntry.js",
			runtimePlugins:
				target === "server"
					? [require.resolve("@module-federation/node/runtimePlugin")]
					: undefined,
			exposes: exposeModules,
			library: target === "server" ? { type: "commonjs-module" } : undefined,
			shared: mode !== "development" && disableReactSharing !== true ? shared : undefined,
		} satisfies moduleFederationPlugin.ModuleFederationPluginOptions
		plugins.push(new ModuleFederationPlugin(moduleFederationConfig))
	}

	const tools: ToolsConfig = {
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
								exclude: [":root", "html", "body"],
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
	}

	if (isLinariaUsed || isReactCompilerEnabled) {
		rsBuildPlugins.push(
			pluginBabel({
				babelLoaderOptions: (options, { addPresets }) => {
					options.sourceMaps = false
					if (isReactCompilerEnabled) {
						options.plugins ??= []
						options.plugins.unshift([
							"babel-plugin-react-compiler",
							{ target: getReactCompilerTarget(packageJson, reactCompilerTarget) },
						])
					}
					addPresets(["@babel/preset-react"])
				},
			}),
		)
	}

	if (isLinariaUsed) {
		tools.bundlerChain = (chain, { CHAIN_ID }) => {
			chain.module
				.rule(CHAIN_ID.RULE.JS)
				.use(CHAIN_ID.USE.SWC)
				.after(CHAIN_ID.USE.BABEL)
				.loader("@wyw-in-js/webpack-loader")
		}
	}

	let htmlTags: HtmlTagDescriptor[] | undefined =
		injectDevtoolsScript && target !== "server"
			? [
					{
						tag: "script" as const,
						attrs: { src: "http://localhost:8097" },
						append: false,
					},
				]
			: undefined

	const runtimeVars = process.env.RUNTIME_VARS?.split(",").map((v) => v.trim())

	if (runtimeVars) {
		Object.keys(publicVars).forEach((key) => {
			const varName = key.replace(/^(process\.env\.|import\.meta\.env\.)/, "")
			if (runtimeVars.includes(varName)) {
				const buildTimeFallback = publicVars[key]
				publicVars[key] =
					`((typeof window !== 'undefined' && window._env_ && window._env_["${packageName}"] && window._env_["${packageName}"].${varName}) || ${buildTimeFallback})`
			}
		})
		htmlTags ??= []
		htmlTags.push({
			tag: "script",
			head: true,
			append: false,
			attrs: {
				src: "./env-config.js",
			},
		})
	}

	return {
		source: {
			tsconfigPath: project.hasFile("tsconfig.json")
				? project.resolvePath("tsconfig.json")
				: undefined,
			define: {
				"process.env.VERSION": JSON.stringify(buildVersion),
				"import.meta.env.VERSION": JSON.stringify(buildVersion),
				"process.env.BUILD_VERSION": JSON.stringify(buildVersion),
				"import.meta.env.BUILD_VERSION": JSON.stringify(buildVersion),
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
		html: {
			template: ({ value, entryName }) => entryPoints[entryName]?.pathHtml ?? value,
			templateParameters: (defaultParams, { entryName }) => ({
				...defaultParams,
				CHAYNS_TOOLKIT_CSS_TAG: getCssTag(cssVersion),
				...entryPoints[entryName]?.templateParameters,
			}),
			tags: htmlTags,
		},
		tools,
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
			manifest:
				manifest?.host && target !== "server"
					? {
							generate: ({ manifestData }) => {
								const filterFiles = (files: string[]) =>
									files.filter((file) => !file.endsWith(".map"))

								manifestData.allFiles = filterFiles(manifestData.allFiles)
								Object.values(manifestData.entries).forEach((value) => {
									if (value.assets) {
										value.assets = filterFiles(value.assets)
									}
								})

								if (manifest?.externalAssets) {
									;(manifestData as Record<string, unknown>).staticFiles =
										manifest.externalAssets
								}

								if (manifest?.textStringLibraries) {
									;(manifestData as Record<string, unknown>).textStringLibraries =
										manifest.textStringLibraries
								}

								;(manifestData as Record<string, unknown>).buildVersion =
									buildVersion

								return manifestData
							},
						}
					: false,
		},
		dev: {
			assetPrefix: "auto",
		},
	}
}
