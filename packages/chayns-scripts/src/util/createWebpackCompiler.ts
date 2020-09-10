import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin"
import path from "path"
import postcssFlexbugsFixes from "postcss-flexbugs-fixes"
import postcssPresetEnv from "postcss-preset-env"
import webpack, { Compiler, Plugin } from "webpack"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer"

type Mode = "development" | "production"

interface CreateConfigOptions {
	mode: Mode
	analyze?: boolean
}

export function createWebpackCompiler({
	mode,
	analyze = false,
}: CreateConfigOptions): Compiler {
	const plugins: Plugin[] = [
		new HtmlWebpackPlugin({
			template: path.resolve(process.cwd(), "src/index.html"),
			minify:
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
					: undefined,
		}),
	]

	if (analyze) {
		plugins.push(new BundleAnalyzerPlugin({}))
	}

	switch (mode) {
		case "development":
			process.env.BROWSERSLIST = [
				"last 1 chrome version",
				"last 1 firefox version",
				"last 1 safari version",
			].join()

			plugins.push(new ReactRefreshWebpackPlugin())
			break
		case "production":
			process.env.BROWSERSLIST = [">0.5%", "not dead", "not op_mini all"].join()

			plugins.push(
				new MiniCssExtractPlugin({
					filename: "static/css/[name].[contenthash].css",
					chunkFilename: "static/css/[name].[chunkhash].chunk.css",
				})
			)
			plugins.push(new OptimizeCssAssetsPlugin())
			break
		default:
	}

	const shouldUseSourceMaps = mode !== "production"

	return webpack({
		entry: path.resolve(process.cwd(), "src/index"),
		mode,
		devtool: shouldUseSourceMaps ? "cheap-module-eval-source-map" : false,
		context: process.cwd(),
		output: {
			path: path.resolve(process.cwd(), "build"),
			hashDigestLength: 12,
			filename:
				mode === "development"
					? "static/js/bundle.js"
					: "static/js/[name].[contenthash].js",
		},
		resolve: {
			extensions: [".js", ".jsx", ".ts", ".tsx"],
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx|ts|tsx)$/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ["@chayns-scripts"],
							babelrc: false,
							configFile: false,
							compact: mode === "production",
						},
					},
					exclude: /node_modules/,
				},
				{
					test: /\.(css|scss)/,
					use: [
						mode === "development"
							? "style-loader"
							: MiniCssExtractPlugin.loader,
						"css-loader",
						{
							loader: "postcss-loader",
							options: {
								postcssOptions: {
									plugins: [
										postcssPresetEnv({
											autoprefixer: { flexbox: "no-2009" },
											stage: 2,
										}),
										postcssFlexbugsFixes(),
									],
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
							limit: 10000,
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
			splitChunks: {
				chunks: "all",
				name: false,
			},
		},
		performance: false,
	})
}
