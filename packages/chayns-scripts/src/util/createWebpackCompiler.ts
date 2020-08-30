import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin"
import path from "path"
// @ts-expect-error
import postcssPresetEnv from "postcss-preset-env"
import webpack, { Compiler, Configuration, Plugin } from "webpack"
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
	let devtool: Configuration["devtool"]

	const plugins: Plugin[] = [
		new HtmlWebpackPlugin({
			template: path.resolve(process.cwd(), "src/index.html"),
		}),
	]

	if (analyze) {
		plugins.push(new BundleAnalyzerPlugin({}))
	}

	switch (mode) {
		case "development":
			devtool = "cheap-module-eval-source-map"
			process.env.BROWSERSLIST = [
				"last 1 chrome version",
				"last 1 firefox version",
				"last 1 safari version",
			].join()

			plugins.push(new ReactRefreshWebpackPlugin())
			break
		case "production":
			devtool = "nosources-source-map"
			process.env.BROWSERSLIST = [">0.5%", "not dead", "not op_mini all"].join()

			plugins.push(
				new MiniCssExtractPlugin({
					filename: "[name].[contenthash].css",
					chunkFilename: "[id].[chunkhash].css",
				})
			)
			plugins.push(new OptimizeCssAssetsPlugin())
			break
	}

	return webpack({
		entry: path.resolve(process.cwd(), "src/index"),
		mode,
		devtool,
		context: process.cwd(),
		output: {
			path: path.resolve(process.cwd(), "build"),
			hashDigestLength: 12,
			filename:
				mode === "development" ? "[name].js" : "[name].[contenthash].js",
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
								sourceMap: true,
								plugins: [postcssPresetEnv()],
							},
						},
						"sass-loader",
					],
				},
				{
					test: /\.(png|jpe?g|gif)$/i,
					use: {
						loader: "url-loader",
						options: {
							limit: 8192,
							fallback: {
								loader: "file-loader",
								options: { name: "[contenthash:12].[ext]" },
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
				cacheGroups: {
					commons: {
						test: /[\\/]node_modules[\\/]/,
						name: "vendors",
						chunks: "all",
					},
				},
			},
		},
	})
}
