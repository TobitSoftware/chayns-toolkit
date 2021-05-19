import { version as babelVersion } from "@babel/core"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import { CleanWebpackPlugin } from "clean-webpack-plugin"
import * as crypto from "crypto"
import DotenvWebpackPlugin from "dotenv-webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { paramCase } from "param-case"
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin"
import type { PackageJson } from "type-fest"
import { Configuration, ResolveOptions } from "webpack"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import { setBrowserslistEnvironment } from "../features/environment/browserslist"
import createBabelPresetOptions from "./createBabelPresetOptions"
import { project } from "./project"

type Mode = "development" | "production"

interface CreateConfigOptions {
	mode: Mode
	analyze: boolean
	singleBundle: boolean
	outputFilename: string
	path?: string
	packageJson: PackageJson
	injectDevtoolsScript?: boolean
}

export async function createWebpackConfig({
	mode,
	analyze,
	outputFilename,
	singleBundle,
	path: outputPath,
	packageJson,
	injectDevtoolsScript = false,
}: CreateConfigOptions): Promise<Configuration> {
	const plugins = [
		new DotenvWebpackPlugin({
			path: "./.env.local",
			systemvars: true,
			silent: true,
		}),
	]

	let templateContent: string | null = null

	if (mode === "development" && project.hasFile("src/index.dev.html")) {
		templateContent = await project.readFile("src/index.dev.html")
	}

	if (!templateContent && project.hasFile("src/index.html")) {
		templateContent = await project.readFile("src/index.html")
	}

	// Add the React devtools script tag
	if (injectDevtoolsScript && templateContent && mode === "development") {
		const firstScriptIndex = templateContent.indexOf("<script")

		templateContent = `${templateContent.substring(
			0,
			firstScriptIndex
		)}\n<!-- The React Devtools connection script -->
    <script src="http://localhost:8097"></script>\n${templateContent.substring(
		firstScriptIndex
	)}`
	}

	if (templateContent) {
		const minify =
			mode === "production"
				? {
						removeComments: true,
						collapseWhitespace: true,
						removeRedundantAttributes: true,
						useShortDoctype: true,
						removeEmptyAttributes: true,
						removeStyleLinkTypeAttributes: true,
						keepClosingSlash: true,
						minifyJS: true,
						minifyCSS: true,
						minifyURLs: true,
				  }
				: undefined

		plugins.push(
			new HtmlWebpackPlugin({
				templateContent,
				minify,
			})
		)
	}

	if (analyze) {
		plugins.push(new BundleAnalyzerPlugin())
	}

	if (mode === "production") {
		plugins.push(new CleanWebpackPlugin())
	}

	setBrowserslistEnvironment(mode)

	if (mode === "development") {
		plugins.push(new ReactRefreshWebpackPlugin())
	}

	const packageName = packageJson.name

	if (!packageName)
		throw Error("The name field in package.json has to be provided.")

	if (!singleBundle && mode !== "development") {
		plugins.push(
			new MiniCssExtractPlugin({
				filename: `static/css/${packageName}.[contenthash].css`,
				chunkFilename: `static/css/${packageName}.[chunkhash].chunk.css`,
			})
		)
	}

	const shouldUseSourceMaps = mode !== "production"

	const babelPresetOptions = createBabelPresetOptions({
		packageJson,
	})

	const babelCacheIdentifier = crypto
		.createHash("md5")
		.update(
			[
				JSON.stringify(babelPresetOptions),
				process.env.BABEL_ENV,
				process.env.NODE_ENV,
				babelVersion,
			].join("--")
		)
		.digest("hex")

	const resolvePlugins: Exclude<ResolveOptions["plugins"], undefined> = []

	if (project.hasFile("jsconfig.json")) {
		resolvePlugins.push(
			new TsconfigPathsPlugin({
				configFile: "jsconfig.json",
				extensions: [".js", ".jsx"],
			})
		)
	} else if (project.hasFile("tsconfig.json")) {
		resolvePlugins.push(
			new TsconfigPathsPlugin({
				extensions: [".js", ".jsx", ".ts", ".tsx"],
			})
		)
	}

	return {
		entry: project.resolvePath("src/index"),
		mode,
		// `webpack-dev-server` does not yet pick up `browserslist` as a web
		// target, so HMR does not work.
		target: mode === "development" ? "web" : "browserslist",
		devtool: shouldUseSourceMaps ? "eval-cheap-source-map" : false,
		context: project.resolvePath("."),
		output: {
			path: outputPath ?? project.resolvePath("build/"),
			hashDigestLength: 12,
			filename: getOutputPath({
				mode,
				filename: outputFilename,
				singleBundle,
				packageName,
			}),
			assetModuleFilename: "static/media/[hash][ext][query]",
		},
		resolve: {
			extensions: [".js", ".jsx", ".ts", ".tsx"],
			plugins: resolvePlugins,
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					use: require.resolve("source-map-loader"),
					include: /node_modules\/chayns-components/,
				},
				{
					test: /\.(js|jsx|ts|tsx)$/,
					use: {
						loader: require.resolve("babel-loader"),
						options: {
							presets: [["@chayns-toolkit", babelPresetOptions]],
							babelrc: false,
							configFile: false,
							compact: mode === "production",
							cacheDirectory: true,
							// eslint-disable-next-line
							cacheIdentifier: babelCacheIdentifier,
						},
					},
					exclude: /node_modules/,
				},
				{
					test: /\.(css|scss)/,
					use: [
						mode === "development" || singleBundle
							? require.resolve("style-loader")
							: MiniCssExtractPlugin.loader,
						require.resolve("css-loader"),
						{
							loader: require.resolve("postcss-loader"),
							options: {
								postcssOptions: {
									plugins: [
										[
											"postcss-preset-env",
											{
												autoprefixer: {
													flexbox: "no-2009",
												},
												stage: 2,
											},
										],
										"postcss-flexbugs-fixes",
										mode === "production" && "cssnano",
									].filter(Boolean),
								},
							},
						},
						require.resolve("sass-loader"),
					],
				},
				{
					test: /\.(png|jpe?g|gif|webp)$/i,
					type: "asset",
					parser: {
						dataUrlCondition: { maxSize: 10 * 1024 },
					},
				},
				{
					test: /\.svg$/,
					use: require.resolve("@svgr/webpack"),
				},
			],
		},
		plugins,
		optimization: {
			splitChunks: singleBundle ? false : { chunks: "all" },
		},
		performance: false,
	}
}

function getOutputPath({
	mode,
	filename,
	singleBundle,
	packageName,
}: {
	mode: Mode
	filename: string
	singleBundle: boolean
	packageName: string
}) {
	const outputPath = singleBundle ? "" : "static/js/"

	const preparedFilename = filename.replace(
		"[package]",
		paramCase(packageName)
	)

	if (mode === "development") {
		return `${outputPath}[name].bundle.js`
	}
	return outputPath + preparedFilename
}
