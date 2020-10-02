// @ts-expect-error This function is so small, it doesn't need typings.
import getCacheIdentifier from "@chayns-toolkit/babel-preset/getCacheIdentifier"
import { resolveProjectPath } from "@chayns-toolkit/utilities"
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import { CleanWebpackPlugin } from "clean-webpack-plugin"
import DotenvWebpackPlugin from "dotenv-webpack"
import * as fs from "fs"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin"
import { paramCase } from "param-case"
import webpack, { Compiler, Plugin } from "webpack"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"
import { setBrowsersListEnv } from "../features/environment/browserslist"

type Mode = "development" | "production"

interface CreateConfigOptions {
	mode: Mode
	analyze: boolean
	singleBundle: boolean
	outputFilename: string
	path?: string
}

export function createWebpackCompiler({
	mode,
	analyze,
	outputFilename,
	singleBundle,
	path,
}: CreateConfigOptions): Compiler {
	const plugins: Plugin[] = [
		new DotenvWebpackPlugin({
			path: "./.env.local",
			systemvars: true,
			silent: true,
		}),
	]

	let htmlPath: string | undefined

	if (mode === "development") {
		const hasDevFile = fs.existsSync(resolveProjectPath("src/index.dev.html"))

		if (hasDevFile) {
			htmlPath = "src/index.dev.html"
		}
	}

	if (fs.existsSync(resolveProjectPath("src/index.html"))) {
		htmlPath ??= "src/index.html"
	}

	// eslint-disable-next-line
	const packageJson: { name: string } = require(resolveProjectPath(
		"package.json"
	))
	const packageName = packageJson.name

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
				template: resolveProjectPath(htmlPath),
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

	setBrowsersListEnv(mode)

	if (mode === "development") {
		plugins.push(new ReactRefreshWebpackPlugin())
	}

	if (mode === "production" && !singleBundle) {
		plugins.push(
			new MiniCssExtractPlugin({
				filename: `static/css/${packageName}.[contenthash].css`,
				chunkFilename: `static/css/${packageName}.[chunkhash].chunk.css`,
			})
		)
		plugins.push(new OptimizeCssAssetsPlugin())
	}

	const shouldUseSourceMaps = mode !== "production"

	return webpack({
		entry: resolveProjectPath("src/index"),
		mode,
		devtool: shouldUseSourceMaps ? "cheap-module-eval-source-map" : false,
		context: process.cwd(),
		output: {
			path: path ?? resolveProjectPath("build/"),
			hashDigestLength: 12,
			filename: getOutputPath({ mode, filename: outputFilename, singleBundle }),
		},
		resolve: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					use: "source-map-loader",
					include: /node_modules\/chayns-components/,
				},
				{
					test: /\.(js|jsx|ts|tsx)$/,
					use: {
						loader: "babel-loader",
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
							? "style-loader"
							: MiniCssExtractPlugin.loader,
						"css-loader",
						{
							loader: "postcss-loader",
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
										"cssnano",
									].filter(Boolean),
								},
							},
						},
						"sass-loader",
					],
				},
				{
					test: /\.(png|jpe?g|gif|webp)$/i,
					use: {
						loader: "url-loader",
						options: {
							limit: singleBundle ? Infinity : 10000,
							fallback: {
								loader: "file-loader",
								options: { name: "static/media/[contenthash:12].[ext]" },
							},
						},
					},
				},
				{
					test: /\.svg$/,
					use: "@svgr/webpack",
				},
			],
		},
		plugins,
		optimization: {
			splitChunks: singleBundle
				? false
				: {
						chunks: "all",
						name: false,
				  },
		},
		performance: false,
	})
}

function getOutputPath({
	mode,
	filename,
	singleBundle,
}: {
	mode: "development" | "production"
	filename: string
	singleBundle: boolean
}) {
	const outputPath = singleBundle ? "" : "static/js/"

	// eslint-disable-next-line
	const pkg: { name: string } = require(resolveProjectPath("package.json"))

	const preparedFilename = filename.replace("[package]", paramCase(pkg.name))

	if (mode === "development") {
		return `${outputPath}bundle.js`
	}
	return outputPath + preparedFilename
}
