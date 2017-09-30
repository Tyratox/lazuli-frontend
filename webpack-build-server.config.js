const path = require("path");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");

process.traceDeprecation = true; //https://github.com/webpack/loader-utils/issues/56

module.exports = {
	devtool: "nosources-source-map",

	externals: [nodeExternals()],

	target: "node",
	node: {
		__dirname: false,
		__filename: false
	},

	context: __dirname,

	entry: [path.join(__dirname, "src/lazuli-dashboard")],

	output: {
		path: path.join(__dirname, "build/"),
		filename: "server.js"
	},

	plugins: [
		/*new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		}),*/
		new webpack.NoEmitOnErrorsPlugin()
	],

	resolve: {
		modules: [
			path.resolve(__dirname, "src"),
			path.resolve(__dirname, "node_modules")
		],
		extensions: [".js", ".jsx", ".css", ".scss"]
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: [path.resolve(__dirname, "src")],

				use: [
					{
						loader: "babel-loader",
						options: {
							presets: [
								[
									"env",
									{
										targets: {
											node: "current"
										}
									}
								],
								"react"
							],
							plugins: [
								[
									"react-css-modules",
									{
										handleMissingStyleName: "throw",
										//Remove the matching style import. This option is used to enable server-side rendering.
										removeImport: true,
										filetypes: {
											".scss": {
												syntax: "postcss-scss"
											}
										}
									}
								],
								"transform-object-rest-spread",
								"transform-class-properties"
							]
						}
					}
				]
			},
			{
				test: /\.css$/,
				include: [path.resolve(__dirname, "src")],

				use: [
					{
						loader: "style-loader",
						options: {
							sourceMap: true
						}
					},
					{
						loader: "css-loader",
						options: {
							modules: true,
							importLoaders: true,
							localIdentName: "[path]___[name]__[local]___[hash:base64:5]"
						}
					}
				]
			},
			{
				test: /\.scss$/,
				include: [path.resolve(__dirname, "src")],

				use: [
					{
						loader: "style-loader",
						options: {
							sourceMap: true
						}
					},
					{
						loader: "css-loader",
						options: {
							modules: true,
							importLoaders: true,
							localIdentName: "[path]___[name]__[local]___[hash:base64:5]"
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	}
};
