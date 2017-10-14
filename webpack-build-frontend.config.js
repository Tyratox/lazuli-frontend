const path = require("path");
const webpack = require("webpack");

const context = __dirname;

process.traceDeprecation = true; //https://github.com/webpack/loader-utils/issues/56

module.exports = {
	devtool: "nosources-source-map",

	context,

	entry: [path.join(__dirname, "src/frontend/index.jsx")],

	output: {
		path: path.join(__dirname, "build/frontend/"),
		filename: "bundle.js"
	},

	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		}),
		new webpack.optimize.UglifyJsPlugin(), //minify everything
		new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
		new webpack.NoEmitOnErrorsPlugin()
	],

	resolve: {
		modules: [
			path.resolve(__dirname, "src", "frontend"),
			path.resolve(__dirname, "node_modules")
		],
		extensions: [".js", ".jsx", ".css", ".scss"]
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: [path.resolve(__dirname, "src/frontend")],

				use: [
					{
						loader: "babel-loader",
						options: {
							presets: [
								[
									"env",
									{
										targets: {
											browsers: ["> 1%", "last 2 major versions", "IE 10"]
										}
									}
								],
								"react"
							],
							plugins: [
								"relay",
								"transform-object-rest-spread",
								"transform-class-properties"
							]
						}
					}
				]
			},
			{
				test: /\.css$/,
				include: [path.resolve(__dirname, "src/frontend")],

				use: [
					"isomorphic-style-loader",
					{
						loader: "css-loader",
						options: {
							modules: true,
							importLoaders: true,
							localIdentName: "[path]___[name]__[local]___[hash:base64:5]"
						}
					},
					"postcss-loader"
				]
			},
			{
				test: /\.scss$/,
				include: [path.resolve(__dirname, "src/frontend")],

				use: [
					"isomorphic-style-loader",
					{
						loader: "css-loader",
						options: {
							modules: true,
							importLoaders: true,
							localIdentName: "[path]___[name]__[local]___[hash:base64:5]"
						}
					},
					"postcss-loader",
					"sass-loader"
				]
			}
		]
	}
};
