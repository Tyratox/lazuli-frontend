/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const http2 = __webpack_require__(5);
const express = __webpack_require__(6);
const compression = __webpack_require__(7);

const path = __webpack_require__(0);
const fs = __webpack_require__(8);

const config = __webpack_require__(9);
const page = __webpack_require__(10);

const expressServer = express();
const key = fs.readFileSync(config.KEY_PATH);
const cert = fs.readFileSync(config.CERT_PATH);

const root = __dirname.includes("build") ? __dirname.split("build")[0] : __dirname;

const renderSite = (request, response) => {
	response.end(page(request));
};

const httpServer = http2.createServer({
	key,
	cert
}, expressServer).listen(config.HTTP_PORT, "0.0.0.0", () => {
	console.log("Server is listening on", "https://" + httpServer.address().address + ":" + httpServer.address().port);
	console.log("You can now open the URL in the browser.");
});

//compress all the things
expressServer.use(compression());

//every other request should be routed by react
expressServer.use("/assets/", express.static(path.join(root, "assets")));

//the service worker should be able to act on the root directory
expressServer.get("/service-worker.js", (request, response) => {
	response.sendFile(path.join(root, "assets/service-worker.js"));
});

if (process.env.NODE_ENV === "development") {
	const webpack = __webpack_require__(2);
	const webpackConfig = __webpack_require__(13);
	const compiler = webpack(webpackConfig);

	expressServer.use(__webpack_require__(14)(compiler, {
		publicPath: webpackConfig.output.publicPath
	}));

	expressServer.use(__webpack_require__(15)(compiler));

	expressServer.get("*", (request, response) => {
		return renderSite(request, response);
	});
} else if (process.env.NODE_ENV === "production") {
	//the bundle is also placed in the root directory
	expressServer.get("/bundle.js", (request, response) => {
		response.sendFile(path.join(__dirname, "frontend/bundle.js"));
	});

	//Store bundle.js code in RAM for faster access
	const code = fs.readFileSync(path.resolve(__dirname, "frontend/bundle.js"));

	expressServer.get("*", (request, response) => {
		//check whether the browser supports push
		if (response.push) {
			//Push the bundle to the client as fast as possible
			const stream = response.push("/bundle.js", {
				status: 200,
				method: "GET",
				request: {
					accept: "*/*"
				},
				response: {
					"Content-Type": "application/javascript"
				}
			});

			stream.on("error", err => {
				console.log(err);
			});

			stream.end(code);
		}

		return renderSite(request, response);
	});
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("spdy");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = {"KEY_PATH":"./keys/server.key","CERT_PATH":"./keys/server.crt","HTTP_PORT":8080}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(11);

var _server2 = _interopRequireDefault(_server);

var _App = __webpack_require__(12);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = request => {
	const html = _server2.default.renderToString(_react2.default.createElement(_App2.default, { url: request.url }));

	return _server2.default.renderToString(_react2.default.createElement(
		"html",
		null,
		_react2.default.createElement(
			"head",
			null,
			_react2.default.createElement("meta", { charSet: "utf-8" }),
			_react2.default.createElement("meta", { name: "keywords", content: "" }),
			_react2.default.createElement("meta", { name: "author", content: "Tyratox" }),
			_react2.default.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }),
			_react2.default.createElement(
				"title",
				null,
				"Title"
			)
		),
		_react2.default.createElement(
			"body",
			null,
			_react2.default.createElement("div", { id: "root", dangerouslySetInnerHTML: { __html: html } }),
			_react2.default.createElement("script", { src: "/bundle.js" })
		)
	));
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const App = () => {
	return _react2.default.createElement(
		"span",
		{ className: "src-frontend-___App__class___3KvVe" },
		"hello world"
	);
};

exports.default = App;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

const path = __webpack_require__(0);
const webpack = __webpack_require__(2);

process.traceDeprecation = true; //https://github.com/webpack/loader-utils/issues/56

//this config can and *will* be bundled so it can and will be relocated
const root = __dirname.includes("build")
	? __dirname.split("build")[0]
	: __dirname;

const context = root;

module.exports = {
	context,

	entry: [
		"react-hot-loader/patch",
		"webpack-hot-middleware/client",
		path.join(root, "src/frontend/index.jsx")
	],

	output: {
		path: path.join(root, "build/frontend/"),
		filename: "bundle.js",
		publicPath: "/"
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	],

	resolve: {
		modules: [
			path.resolve(root, "src", "frontend"),
			path.resolve(root, "node_modules")
		],
		extensions: [".js", ".jsx", ".css", ".scss"]
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: [path.resolve(root, "src/frontend")],

				use: [
					{
						loader: "react-hot-loader/webpack"
					},
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
								[
									"react-css-modules",
									{
										context,
										webpackHotModuleReloading: true,
										handleMissingStyleName: "warn",
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
				include: [path.resolve(root, "src/frontend")],

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
				include: [path.resolve(root, "src/frontend")],

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


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map