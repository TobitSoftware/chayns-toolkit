// @ts-expect-error This function is so small, it doesn't need typings.
import getCacheIdentifier from "@chayns-toolkit/babel-preset/getCacheIdentifier"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import { CleanWebpackPlugin } from "clean-webpack-plugin"
import DotenvWebpackPlugin from "dotenv-webpack"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import { paramCase } from "param-case"
import type { PackageJson } from "type-fest"
import { Configuration } from "webpack"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import { setBrowserslistEnvironment } from "../features/environment/browserslist"
import { project } from "./project"

type Mode = "development" | "production"

interface CreateConfigOptions {
	mode: Mode
	analyze: boolean
	singleBundle: boolean
	outputFilename: string
	path?: string
	packageJson: PackageJson
}

export function createWebpackConfig({
	mode,
	analyze,
	outputFilename,
	singleBundle,
	path,
	packageJson,
}: CreateConfigOptions): Configuration {
	const plugins = [
		new DotenvWebpackPlugin({
			path: "./.env.local",
			systemvars: true,
			silent: true,
		}),
	]

	let htmlPath: string | undefined

	if (mode === "development") {
		const hasDevFile = project.hasFile("src/index.dev.html")

		if (hasDevFile) {
			htmlPath = "src/index.dev.html"
		}
	}

	if (!htmlPath && project.hasFile("src/index.html")) {
		htmlPath = "src/index.html"
	}

	if (htmlPath) {
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
				template: project.resolvePath(htmlPath),
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

	return {
		entry: project.resolvePath("src/index"),
		mode,
		// `webpack-dev-server` does not yet pick up `browserslist` as a web
		// target, so HMR does not work.
		target: mode === "development" ? "web" : "browserslist",
		devtool: shouldUseSourceMaps ? "eval-cheap-source-map" : false,
		context: process.cwd(),
		output: {
			path: path ?? project.resolvePath("build/"),
			hashDigestLength: 12,
			filename: getOutputPath({
				mode,
				filename: outputFilename,
				singleBundle,
				packageName,
			}),
		},
		resolve: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
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
							presets: ["@chayns-toolkit"],
							babelrc: false,
							configFile: false,
							compact: mode === "production",
							cacheDirectory: true,
							// eslint-disable-next-line
							cacheIdentifier: getCacheIdentifier(),
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
												autoprefixer: { flexbox: "no-2009" },
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
					use: {
						loader: require.resolve("url-loader"),
						options: {
							limit: singleBundle ? Infinity : 10000,
							fallback: {
								loader: require.resolve("file-loader"),
								options: { name: "static/media/[contenthash:12].[ext]" },
							},
						},
					},
				},
				{
					test: /\.svg$/,
					use: require.resolve("@svgr/webpack"),
				},
			],
		},
		// @ts-expect-error: The plugin type definitions do not yet match webpack 5.
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

	const preparedFilename = filename.replace("[package]", paramCase(packageName))

	if (mode === "development") {
		return `${outputPath}[name].bundle.js`
	}
	return outputPath + preparedFilename
}
