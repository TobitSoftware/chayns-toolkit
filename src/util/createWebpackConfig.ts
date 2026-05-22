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
	filename?: string
	templateParameters?: {
		[key: string]: string
	}
	target?: "node" | "web" | "web-worker"
}

type EntryPoints = {
	[key: string]: EntryPoint
}

type ReactRequiredVersions = {
	react?: string
	reactDom?: string
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
	reactRequiredVersions?: string | ReactRequiredVersions
	entryPoints: EntryPoints
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

type CreateEnvironmentConfigOptions = Pick<
	CreateConfigOptions,
	| "analyze"
	| "cssVersion"
	| "disableReactSharing"
	| "entryPoints"
	| "exposeModules"
	| "injectDevtoolsScript"
	| "manifest"
	| "mode"
	| "outputFilename"
> & {
	buildVersion: string
	env: "web" | "node" | "web-worker"
	packageName: string
	pathPrefix?: string
	reactRequiredVersions: ReactRequiredVersions
}

const getEnvironmentDistPathConfig = (
	env: CreateEnvironmentConfigOptions["env"],
	pathPrefix?: string,
) => {
	if (!pathPrefix) return undefined

	const staticPrefix = `${pathPrefix}static`
	const jsDir = env === "node" ? `${staticPrefix}/js` : `${staticPrefix}/js`
	const jsAsyncDir = `${staticPrefix}/js/async`
	const cssDir = `${staticPrefix}/css`
	const cssAsyncDir = `${staticPrefix}/css/async`

	return {
		js: jsDir,
		jsAsync: jsAsyncDir,
		css: cssDir,
		cssAsync: cssAsyncDir,
		svg: `${staticPrefix}/svg`,
		font: `${staticPrefix}/font`,
		html: pathPrefix,
		wasm: `${staticPrefix}/wasm`,
		image: `${staticPrefix}/image`,
		media: `${staticPrefix}/media`,
		assets: `${staticPrefix}/assets`,
		favicon: pathPrefix,
	}
}

const prefixEntryFilename = (filename: string | undefined, pathPrefix?: string) => {
	if (!filename || !pathPrefix || filename.startsWith(pathPrefix)) {
		return filename
	}

	return `${pathPrefix}${filename}`
}

const shouldIncludeEntryPointInEnvironment = (
	entryPoint: EntryPoint,
	env: CreateEnvironmentConfigOptions["env"],
) => {
	if (env === "web-worker") {
		return entryPoint.target === "web-worker"
	}

	return !entryPoint.target || entryPoint.target === env
}

const createEnvironmentEntries = (
	entryPoints: EntryPoints,
	env: CreateEnvironmentConfigOptions["env"],
	pathPrefix?: string,
	outputFilename?: CreateConfigOptions["outputFilename"],
): RsbuildEntry => {
	const entries: RsbuildEntry = {}

	Object.entries(entryPoints).forEach(([entryName, entryPoint]) => {
		if (!shouldIncludeEntryPointInEnvironment(entryPoint, env)) {
			return
		}

		if (env === "web" && entryPoint.pathHtml) {
			if (!entryPoint.filename) {
				entries[entryName] = entryPoint.pathIndex
				return
			}
		}

		const entry: NonNullable<RsbuildEntry[string]> = {
			import: entryPoint.pathIndex,
		}

		if (!entryPoint.pathHtml) {
			entry.html = false
		}

		const resolvedFilename =
			prefixEntryFilename(entryPoint.filename, pathPrefix) ??
			(env === "web"
				? undefined
				: prefixEntryFilename(outputFilename?.js ?? "[name].js", pathPrefix))

		if (resolvedFilename) {
			entry.filename = resolvedFilename
		}

		entries[entryName] = entry
	})

	return entries
}

const getModuleFederationFilename = (pathPrefix?: string) => {
	const baseFilename = "v2.remoteEntry.js"

	return pathPrefix ? `${pathPrefix}${baseFilename}` : baseFilename
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

export function resolveReactRequiredVersions(
	packageJson: PackageJson,
	reactRequiredVersions?: string | ReactRequiredVersions,
): ReactRequiredVersions {
	const defaultReactVersion =
		packageJson.peerDependencies?.react ?? packageJson.dependencies?.react
	const defaultReactDomVersion =
		packageJson.peerDependencies?.["react-dom"] ?? packageJson.dependencies?.["react-dom"]

	if (typeof reactRequiredVersions === "string") {
		return {
			react: reactRequiredVersions,
			reactDom: reactRequiredVersions,
		}
	}

	return {
		react: reactRequiredVersions?.react ?? defaultReactVersion,
		reactDom:
			reactRequiredVersions?.reactDom ??
			reactRequiredVersions?.react ??
			defaultReactDomVersion,
	}
}

const stripPathPrefix = (value: string, pathPrefix?: string) => {
	if (!pathPrefix) {
		return value
	}

	return value.startsWith(pathPrefix) ? value.slice(pathPrefix.length) : value
}

const normalizeManifestDataPaths = (
	manifestData: {
		allFiles: string[]
		entries: Record<
			string,
			{
				initial?: { js?: string[]; css?: string[] }
				async?: { js?: string[]; css?: string[] }
				html?: string[]
				assets?: string[]
			}
		>
		integrity?: Record<string, string>
	},
	pathPrefix?: string,
) => {
	manifestData.allFiles = manifestData.allFiles.map((file) => stripPathPrefix(file, pathPrefix))

	Object.values(manifestData.entries).forEach((entry) => {
		if (entry.initial?.js) {
			entry.initial.js = entry.initial.js.map((file) => stripPathPrefix(file, pathPrefix))
		}
		if (entry.initial?.css) {
			entry.initial.css = entry.initial.css.map((file) => stripPathPrefix(file, pathPrefix))
		}
		if (entry.async?.js) {
			entry.async.js = entry.async.js.map((file) => stripPathPrefix(file, pathPrefix))
		}
		if (entry.async?.css) {
			entry.async.css = entry.async.css.map((file) => stripPathPrefix(file, pathPrefix))
		}
		if (entry.html) {
			entry.html = entry.html.map((file) => stripPathPrefix(file, pathPrefix))
		}
		if (entry.assets) {
			entry.assets = entry.assets.map((file) => stripPathPrefix(file, pathPrefix))
		}
	})

	if (manifestData.integrity) {
		manifestData.integrity = Object.fromEntries(
			Object.entries(manifestData.integrity).map(([file, integrity]) => [
				stripPathPrefix(file, pathPrefix),
				integrity,
			]),
		)
	}
}

async function createEnvironmentConfig({
	analyze,
	buildVersion,
	cssVersion,
	disableReactSharing = false,
	entryPoints,
	exposeModules,
	injectDevtoolsScript = false,
	manifest = {},
	mode,
	outputFilename,
	packageName,
	pathPrefix,
	reactRequiredVersions,
	env,
}: CreateEnvironmentConfigOptions): Promise<RsbuildConfig["environments"]> {
	const entries = createEnvironmentEntries(entryPoints, env, pathPrefix, outputFilename)
	const supportsModuleFederation = env !== "web-worker"

	if (Object.keys(entries).length === 0 && !(exposeModules && supportsModuleFederation)) {
		return {}
	}

	const plugins: Rspack.Configuration["plugins"] = []

	if (analyze || process.env.BUNDLE_ANALYZE === "true") {
		plugins.push(new BundleAnalyzerPlugin())
	}

	if (exposeModules && supportsModuleFederation) {
		if (Object.keys(entries).length === 0) {
			entries.index = { import: undefined!, html: false }
		}

		const shared: ConstructorParameters<typeof ModuleFederationPlugin>[0]["shared"] = {
			react: {
				requiredVersion: reactRequiredVersions.react,
			},
			"react-dom": {
				requiredVersion: reactRequiredVersions.reactDom,
			},
			"react-dom/server": {
				requiredVersion: reactRequiredVersions.reactDom,
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
			filename: getModuleFederationFilename(pathPrefix),
			runtimePlugins:
				env === "node"
					? [require.resolve("@module-federation/node/runtimePlugin")]
					: undefined,
			exposes: exposeModules,
			library: env === "node" ? { type: "commonjs-module" } : undefined,
			shared: mode !== "development" && disableReactSharing !== true ? shared : undefined,
		} satisfies moduleFederationPlugin.ModuleFederationPluginOptions
		plugins.push(new ModuleFederationPlugin(moduleFederationConfig))
	}

	let htmlTags: HtmlTagDescriptor[] | undefined =
		env === "web" && injectDevtoolsScript
			? [
					{
						tag: "script" as const,
						attrs: { src: "http://localhost:8097" },
						append: false,
					},
				]
			: undefined

	if (env === "web" && process.env.RUNTIME_VARS) {
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
		[env]: {
			source: {
				entry: entries,
			},
			dev: {
				assetPrefix: env === "node" ? false : undefined,
			},
			html:
				env === "web"
					? {
							template: ({ value, entryName }) =>
								entryPoints[entryName]?.pathHtml ?? value,
							templateParameters: (defaultParams, { entryName }) => ({
								...defaultParams,
								CHAYNS_TOOLKIT_CSS_TAG: getCssTag(cssVersion),
								...entryPoints[entryName]?.templateParameters,
							}),
							tags: htmlTags,
						}
					: undefined,
			tools:
				plugins.length > 0
					? {
							rspack: {
								plugins,
							},
						}
					: undefined,
			output: {
				target: env,
				module: env === "node" && exposeModules ? false : undefined,
				assetPrefix: env === "node" ? undefined : "auto",
				distPath: getEnvironmentDistPathConfig(env, pathPrefix),
				manifest:
					manifest?.host && env === "web"
						? {
								filename: pathPrefix
									? `${pathPrefix}static/manifest.json`
									: undefined,
								generate: ({ manifestData }) => {
									const filterFiles = (files: string[]) =>
										files.filter((file) => !file.endsWith(".map"))

									manifestData.allFiles = filterFiles(manifestData.allFiles)
									Object.values(manifestData.entries).forEach((value) => {
										if (value.assets) {
											value.assets = filterFiles(value.assets)
										}
									})

									normalizeManifestDataPaths(
										manifestData as typeof manifestData & {
											integrity?: Record<string, string>
										},
										pathPrefix,
									)

									if (manifest?.externalAssets) {
										;(manifestData as Record<string, unknown>).staticFiles =
											manifest.externalAssets
									}

									if (manifest?.textStringLibraries) {
										;(
											manifestData as Record<string, unknown>
										).textStringLibraries = manifest.textStringLibraries
									}

									;(manifestData as Record<string, unknown>).buildVersion =
										buildVersion

									return manifestData
								},
							}
						: false,
			},
			plugins: env === "web" && pathPrefix ? [pluginNodePolyfill()] : undefined,
		},
	}
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
	reactRequiredVersions,
	entryPoints,
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

	const { publicVars } = loadEnv({
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
	const resolvedReactRequiredVersions = resolveReactRequiredVersions(
		packageJson,
		reactRequiredVersions,
	)
	const shouldAnalyze = process.env.BUNDLE_ANALYZE === "true" || analyze

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

	if (!packageName) throw Error("The name field in package.json has to be provided.")

	const environments: RsbuildConfig["environments"] = {}
	if (serverSideRendering) {
		Object.assign(
			environments,
			await createEnvironmentConfig({
				analyze: shouldAnalyze,
				buildVersion,
				cssVersion,
				disableReactSharing,
				entryPoints,
				exposeModules,
				manifest,
				mode,
				outputFilename,
				packageName,
				pathPrefix: "server/",
				reactRequiredVersions: resolvedReactRequiredVersions,
				env: "node",
			}),
		)
	}
	Object.assign(
		environments,
		await createEnvironmentConfig({
			analyze: shouldAnalyze,
			buildVersion,
			cssVersion,
			disableReactSharing,
			entryPoints,
			exposeModules,
			injectDevtoolsScript,
			manifest,
			mode,
			outputFilename,
			packageName,
			pathPrefix: serverSideRendering ? "client/" : undefined,
			reactRequiredVersions: resolvedReactRequiredVersions,
			env: "web",
		}),
	)
	Object.assign(
		environments,
		await createEnvironmentConfig({
			analyze: shouldAnalyze,
			buildVersion,
			cssVersion,
			disableReactSharing,
			entryPoints,
			exposeModules,
			manifest,
			mode,
			outputFilename,
			packageName,
			pathPrefix: serverSideRendering ? "client/" : undefined,
			reactRequiredVersions: resolvedReactRequiredVersions,
			env: "web-worker",
		}),
	)

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
				__REQUIRED_REACT_VERSION__: JSON.stringify(resolvedReactRequiredVersions.react),
				...publicVars,
			},
		},
		plugins: rsBuildPlugins,
		tools,
		output: {
			sourceMap: {
				js: mode === "development" ? "cheap-module-source-map" : "hidden-source-map",
			},
			cleanDistPath: mode === "production",
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
		environments,
	}
}
