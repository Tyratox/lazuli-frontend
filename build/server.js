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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
let counter = 0;

const genUID = exports.genUID = () => {
	return "uid-" + counter++;
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {"KEY_PATH":"./keys/server.key","CERT_PATH":"./keys/server.crt","HTTP_PORT":8080,"API_URL":"","CLIENT_ID":1,"CLIENT_SECRET":""}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const http2 = __webpack_require__(7);
const express = __webpack_require__(8);
const compression = __webpack_require__(9);
const promiseRequest = __webpack_require__(10);

const path = __webpack_require__(2);
const fs = __webpack_require__(11);

const {
	KEY_PATH,
	CERT_PATH,
	HTTP_PORT,
	API_URL,
	CLIENT_ID,
	CLIENT_SECRET
} = __webpack_require__(3);
const page = __webpack_require__(12);

const expressServer = express();
const key = fs.readFileSync(KEY_PATH);
const cert = fs.readFileSync(CERT_PATH);

const root = __dirname.includes("build") ? __dirname.split("build")[0] : __dirname;

const renderSite = (request, response, next) => {
	page(request).then(html => {
		response.end(html);
	}).catch(err => {
		if (err.name === "Page not found") {
			response.end("<h1>404</h1>");
		}
	});
};

const httpServer = http2.createServer({
	key,
	cert
}, expressServer).listen(HTTP_PORT, "0.0.0.0", () => {
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

//in order to make oauth work we need to provide a callback endpoint
expressServer.get("/oauth-callback", (request, response) => {
	if (!request.query.code) {
		return response.redirect("/");
	}

	return promiseRequest({
		url: API_URL + "/oauth2/token",
		method: "POST",
		json: {
			clientId: CLIENT_ID,
			clientSecret: CLIENT_SECRET,
			code: request.query.code,
			grant_type: "authorization_code"
		}
	}).then((response, body) => {
		if (!error && response.statusCode === 200) {
			return Promise.resolve(body.json());
		}
	}).then(({ access_token: token }) => {
		response.end(`<!DOCTYPE html>
				<html>
					<head>
						<script>
							if(typeof(Storage) !== "undefined"){
								localStorage.setItem("access-token", ${JSON.stringify(token)});
								window.location = "/";
							}else{
								//TODO maybe fallback to cookies?
								alert("Your browser doesn't seem to support local storage");
							}
						</script>
					</head>
					<body>
						<noscript><h1>Please enable javascript!</h1></noscript>
					</bod>
				</html>
				`);
	}).catch(error => {
		console.log(error);
		return response.redirect("/?error=true");
	});
});

if (process.env.NODE_ENV === "development") {
	const webpack = __webpack_require__(4);
	const webpackConfig = __webpack_require__(33);
	const compiler = webpack(webpackConfig);

	expressServer.use(__webpack_require__(34)(compiler, {
		publicPath: webpackConfig.output.publicPath
	}));

	expressServer.use(__webpack_require__(35)(compiler));

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
/* 7 */
/***/ (function(module, exports) {

module.exports = require("spdy");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("request-promise-native");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(13);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _server = __webpack_require__(14);

var _server2 = _interopRequireDefault(_server);

var _universalRouter = __webpack_require__(15);

var _universalRouter2 = _interopRequireDefault(_universalRouter);

var _Api = __webpack_require__(16);

var _Api2 = _interopRequireDefault(_Api);

var _routes = __webpack_require__(19);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _universalRouter2.default(_routes2.default);

const css = new Set(); // CSS for all rendered React components

class ContextProvider extends _react2.default.Component {
	getChildContext() {
		return {
			insertCss: (...styles) => styles.forEach(style => css.add(style._getCss()))
		};
	}
	render() {
		return _react2.default.Children.only(this.props.children);
	}
}

ContextProvider.childContextTypes = {
	insertCss: _propTypes2.default.func.isRequired
};

module.exports = request => {
	return router.resolve({ pathname: request.url }).then(({ title, component }) => {
		return Promise.resolve(_server2.default.renderToString(_react2.default.createElement(
			"html",
			null,
			_react2.default.createElement(
				"head",
				null,
				_react2.default.createElement("meta", { charSet: "utf-8" }),
				_react2.default.createElement("meta", { name: "keywords", content: "" }),
				_react2.default.createElement("meta", { name: "author", content: "Tyratox" }),
				_react2.default.createElement("meta", {
					name: "viewport",
					content: "width=device-width, initial-scale=1.0"
				}),
				_react2.default.createElement(
					"style",
					{ type: "text/css" },
					[...css].join("")
				),
				_react2.default.createElement(
					"title",
					null,
					title
				)
			),
			_react2.default.createElement(
				"body",
				null,
				_react2.default.createElement(
					"div",
					{ id: "root" },
					_react2.default.createElement(
						ContextProvider,
						null,
						component
					)
				),
				_react2.default.createElement("script", { src: "/bundle.js" })
			)
		)));
	}).catch(console.log);
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("universal-router");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _isomorphicFetch = __webpack_require__(17);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _relayRuntime = __webpack_require__(18);

var _config = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a set of helper methods for working with REST and/or GraphQL APIs.
 */
const create = ({ baseUrl = _config.API_URL, headers = {} }) => {
	// Default options for the Fetch API
	// https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
	const defaults = {
		mode: baseUrl ? "cors" : "same-origin",
		credentials: baseUrl ? "include" : "same-origin",
		headers: _extends({}, headers, {
			Accept: "application/json",
			"Content-Type": "application/json"
		})
	};

	// Configure Relay environment
	const environment = new _relayRuntime.Environment({
		handlerProvider: null,
		network: _relayRuntime.Network.create((operation, variables /* cacheConfig, uploadables */
		) => (0, _isomorphicFetch2.default)(`${baseUrl}/graphql`, _extends({}, defaults, {
			method: "POST",
			body: JSON.stringify({
				query: operation.text, // GraphQL text from input
				variables
			}),
			headers: _extends({}, defaults.headers, options && options.headers)
		})).then(body => body.json())),
		store: new _relayRuntime.Store(new _relayRuntime.RecordSource())
	});

	return {
		environment,
		fetch: (url, options) => (0, _isomorphicFetch2.default)(`${baseUrl}${url}`, _extends({}, defaults, options, {
			headers: _extends({}, defaults.headers, options && options.headers)
		})),
		fetchQuery: _relayRuntime.fetchQuery.bind(undefined, environment),
		commitMutation: _relayRuntime.commitMutation.bind(undefined, environment),
		commitLocalUpdate: _relayRuntime.commitLocalUpdate.bind(undefined, environment)
	};
};

exports.default = { create };

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("relay-runtime");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _App = __webpack_require__(20);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
	path: "",
	action: () => {
		return { title: "Home", component: _react2.default.createElement(_App2.default, null) };
	}
	/*{
 	path: "/posts",
 	action: () => console.log("checking child routes for /posts"),
 	children: [
 		{
 			path: "", // optional, matches both "/posts" and "/posts/"
 			action: () => <h1>Posts</h1>
 		},
 		{
 			path: "/:id",
 			action: context => <h1>Post #{context.params.id}</h1>
 		}
 	]
 }*/
}];

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _withStyles = __webpack_require__(21);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _App = __webpack_require__(22);

var _App2 = _interopRequireDefault(_App);

var _Landscape = __webpack_require__(28);

var _Landscape2 = _interopRequireDefault(_Landscape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (false) {
	module.hot.accept("./App.scss", function () {
		require("./App.scss");
	});
}

const App = ({ api }) => {
	return _react2.default.createElement(
		"div",
		null,
		_react2.default.createElement(_Landscape2.default, null)
	);
};

exports.default = (0, _withStyles2.default)(_App2.default)(App);

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(23);
    var insertCss = __webpack_require__(25);

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if (false) {
      var removeCss = function() {};
      module.hot.accept("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/postcss-loader/lib/index.js!../../node_modules/sass-loader/lib/loader.js!./App.scss", function() {
        content = require("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/postcss-loader/lib/index.js!../../node_modules/sass-loader/lib/loader.js!./App.scss");

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(24)(undefined);
// imports


// module
exports.push([module.i, "html,\nbody {\n  margin: 0;\n  padding: 0; }\n\n.src-frontend-___App__background___1h6Y0 {\n  -webkit-filter: drop-shadow(-1px -1px 2px rgba(0, 0, 0, 0.5));\n          filter: drop-shadow(-1px -1px 2px rgba(0, 0, 0, 0.5)); }\n", ""]);

// exports
exports.locals = {
	"background": "src-frontend-___App__background___1h6Y0"
};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(26);

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__(27);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

var prefix = 's';
var inserted = {};

// Base64 encoding and decoding - The "Unicode Problem"
// https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

/**
 * Remove style/link elements for specified node IDs
 * if they are no longer referenced by UI components.
 */
function removeCss(ids) {
  ids.forEach(function (id) {
    if (--inserted[id] <= 0) {
      var elem = document.getElementById(prefix + id);
      if (elem) {
        elem.parentNode.removeChild(elem);
      }
    }
  });
}

/**
 * Example:
 *   // Insert CSS styles object generated by `css-loader` into DOM
 *   var removeCss = insertCss([[1, 'body { color: red; }']]);
 *
 *   // Remove it from the DOM
 *   removeCss();
 */
function insertCss(styles) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$replace = _ref.replace,
      replace = _ref$replace === undefined ? false : _ref$replace,
      _ref$prepend = _ref.prepend,
      prepend = _ref$prepend === undefined ? false : _ref$prepend;

  var ids = [];
  for (var i = 0; i < styles.length; i++) {
    var _styles$i = (0, _slicedToArray3.default)(styles[i], 4),
        moduleId = _styles$i[0],
        css = _styles$i[1],
        media = _styles$i[2],
        sourceMap = _styles$i[3];

    var id = moduleId + '-' + i;

    ids.push(id);

    if (inserted[id]) {
      if (!replace) {
        inserted[id]++;
        continue;
      }
    }

    inserted[id] = 1;

    var elem = document.getElementById(prefix + id);
    var create = false;

    if (!elem) {
      create = true;

      elem = document.createElement('style');
      elem.setAttribute('type', 'text/css');
      elem.id = prefix + id;

      if (media) {
        elem.setAttribute('media', media);
      }
    }

    var cssText = css;
    if (sourceMap && typeof btoa === 'function') {
      // skip IE9 and below, see http://caniuse.com/atob-btoa
      cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
      cssText += '\n/*# sourceURL=' + sourceMap.file + '?' + id + '*/';
    }

    if ('textContent' in elem) {
      elem.textContent = cssText;
    } else {
      elem.styleSheet.cssText = cssText;
    }

    if (create) {
      if (prepend) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
      } else {
        document.head.appendChild(elem);
      }
    }
  }

  return removeCss.bind(null, ids);
}

module.exports = insertCss;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Clock = __webpack_require__(29);

var _Clock2 = _interopRequireDefault(_Clock);

var _Ground = __webpack_require__(30);

var _Ground2 = _interopRequireDefault(_Ground);

var _Sky = __webpack_require__(31);

var _Sky2 = _interopRequireDefault(_Sky);

var _Sun = __webpack_require__(32);

var _Sun2 = _interopRequireDefault(_Sun);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const WIDTH = 100;
const HEIGHT = 50;

const CIRCLE_X = WIDTH / 2;
const CIRCLE_Y = HEIGHT;
const CIRCLE_RADIUS = HEIGHT * 0.9;

const HORIZON_Y = CIRCLE_RADIUS - HEIGHT / 2;

const VIEWPORT_START_RAD = Math.asin(1 - HORIZON_Y / CIRCLE_RADIUS);
const VIEWPORT_END_RAD = Math.PI - VIEWPORT_START_RAD;

const SUN_HOUR_STEP = (VIEWPORT_START_RAD - VIEWPORT_END_RAD) / 14;

class Landscape extends _react2.default.Component {
	constructor() {
		super();

		this.componentDidMount = () => {
			/*this.updateInterval = setInterval(() => {
   	const d = new Date();
   	this.setState({ hours: d.getHours() + d.getMinutes() / 60 });
   }, 60000);*/
			this.setState({ hours: 5.5 });
		};

		this.componentWillUnmount = () => {
			if (this.updateInterval) {
				clearInterval(this.updateInterval);
			}
		};

		this.calculateSunPosition = hours => {
			//calculate the sun's position
			const SUN_POS_RAD = VIEWPORT_START_RAD + SUN_HOUR_STEP + //add one because we don't want the sun directly on the horizon
			//because the clock isn't 0-12 we have to map the time to the interval 6-18 / 18-6
			(hours < 6 ? 6 + hours : hours - 6) % 12 * SUN_HOUR_STEP;

			return {
				x: CIRCLE_X + CIRCLE_RADIUS * Math.cos(Math.PI - SUN_POS_RAD),
				y: CIRCLE_Y - CIRCLE_RADIUS * Math.sin(Math.PI - SUN_POS_RAD)
			};
		};

		const d = new Date();
		this.state = { hours: d.getHours() * d.getMinutes() / 60 };
	}

	render() {
		const { hours } = this.state;

		const day = true || hours >= 6 && hours < 18;

		const { x: SUN_X, y: SUN_Y } = this.calculateSunPosition(hours);

		return _react2.default.createElement(
			"svg",
			{
				viewBox: "0 0 " + WIDTH + " " + HEIGHT,
				preserveAspectRatio: "xMinYMin"
			},
			_react2.default.createElement(_Sky2.default, {
				x: "0",
				y: "0",
				width: WIDTH,
				height: HEIGHT / 2,
				day: day,
				hours: this.state.hours
			}),
			_react2.default.createElement(_Clock2.default, {
				x: CIRCLE_X,
				y: CIRCLE_Y,
				radius: CIRCLE_RADIUS,
				clockSift: day ? 19 : 31,
				viewportStartRad: VIEWPORT_START_RAD,
				viewportEndRad: VIEWPORT_END_RAD,
				day: day
			}),
			_react2.default.createElement(_Ground2.default, { x: "0", y: HEIGHT / 2, width: WIDTH, height: HEIGHT / 2 }),
			_react2.default.createElement(_Sun2.default, { x: SUN_X, y: SUN_Y, day: day })
		);
	}
}

exports.default = Landscape;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utilities = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const caluclateScaledCircleCoordinate = ({ x: centerX, y: centerY }, radius, offset) => {
	return {
		x: centerX + radius * Math.cos(offset),
		y: centerY - radius * Math.sin(offset)
	};
};

const calculateCoordinateOffsetByDistance = (slope = false, distance) => {
	const dx = slope ? Math.sqrt(Math.pow(distance, 2) / (Math.pow(slope, 2) + 1)) : 0;

	return {
		dx,
		dy: slope ? slope * dx : distance
	};
};

const toHour = n => Math.abs(n) % 24;

const Clock = ({
	x = 50,
	y = 50,
	radius = 45,
	lineLengthOutside = 1.5,
	lineLengthInside = 0.5,
	distanceToLabel = 1.5,
	clockSift = 19,
	viewportStartRad = 0,
	viewportEndRad = Math.PI,
	day = true
}) => {
	const lineStep = (Math.PI - 2 * viewportStartRad) / 14;
	const opacity = day ? "0.2" : "0.05";

	return _react2.default.createElement(
		"g",
		null,
		_react2.default.createElement("circle", {
			cx: x,
			cy: y,
			r: radius,
			stroke: "#fff",
			strokeWidth: "0.05",
			fillOpacity: "0",
			strokeOpacity: opacity
		}),
		[...Array(14)].map((e, i) => {
			if (i === 0) {
				return null;
			}

			const radOffset = viewportStartRad + lineStep * i;

			//calc the coordinates on the circle
			const { x: refX, y: refY } = caluclateScaledCircleCoordinate({ x, y }, radius, radOffset);

			//then caluclate the slope
			const slope = refX === x ? false : (refY - y) / (refX - x);

			//then use pythagorean theorem
			let { dx, dy } = calculateCoordinateOffsetByDistance(slope, lineLengthOutside);
			let { dx: dx2, dy: dy2 } = calculateCoordinateOffsetByDistance(slope, lineLengthInside);
			let { dx: dxText, dy: dyText } = calculateCoordinateOffsetByDistance(slope, distanceToLabel);

			if (i >= 7) {
				dx *= -1;
				dy *= -1;

				dx2 *= -1;
				dy2 *= -1;

				dxText *= -1;
				dyText *= -1;
			}

			return _react2.default.createElement(
				"g",
				{ key: i },
				_react2.default.createElement("line", {
					key: i,
					x1: refX + dx,
					y1: refY + dy,
					x2: refX - dx2,
					y2: refY - dy2,
					stroke: "#fff",
					strokeWidth: "0.05",
					strokeOpacity: opacity
				}),
				_react2.default.createElement(
					"text",
					{
						x: refX - dxText,
						y: refY - dyText,
						fill: "#fff",
						fontSize: "1.25",
						fontFamily: "sans-serif",
						transform: "rotate(" + (90 - radOffset * (180 / Math.PI)) + ", " + (refX - dxText) + "," + (refY - dyText) + ")",
						textAnchor: "middle",
						dominantBaseline: "central",
						fillOpacity: opacity
					},
					toHour(clockSift - i) + ":00"
				)
			);
		})
	);
};

exports.default = Clock;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utilities = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GRADIENT_ID = (0, _utilities.genUID)();

const Ground = ({ x = 0, y = 25, width = 100, height = 25 }) => {
	return _react2.default.createElement(
		"g",
		null,
		_react2.default.createElement(
			"defs",
			null,
			_react2.default.createElement(
				"linearGradient",
				{ x1: "50%", y1: "0%", x2: "50%", y2: "100%", id: GRADIENT_ID },
				_react2.default.createElement("stop", { stopColor: "#B4ED50", offset: "0%" }),
				_react2.default.createElement("stop", { stopColor: "#429321", offset: "100%" })
			)
		),
		_react2.default.createElement("rect", {
			x: x,
			y: y,
			width: width,
			height: height,
			fill: "url(#" + GRADIENT_ID + ")"
		})
	);
};

exports.default = Ground;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utilities = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GRADIENT_ID = (0, _utilities.genUID)();

const Sky = ({
	x = 0,
	y = 0,
	width = 100,
	height = 25,
	minutes = 0,
	day = true
}) => {
	return _react2.default.createElement(
		"g",
		null,
		_react2.default.createElement(
			"defs",
			null,
			day ? minutes < 8 ? _react2.default.createElement(
				"linearGradient",
				{ x1: "0%", y1: "0%", x2: "100%", y2: "50%", id: GRADIENT_ID },
				_react2.default.createElement("stop", { stopColor: "#F9BF3B", offset: "0%" }),
				_react2.default.createElement("stop", { stopColor: "#2C3E50", offset: "100%" })
			) : _react2.default.createElement(
				"linearGradient",
				{
					x1: "50%",
					y1: "0%",
					x2: "50%",
					y2: "100%",
					id: GRADIENT_ID
				},
				_react2.default.createElement("stop", { stopColor: "#89C4F4", offset: "0%" }),
				_react2.default.createElement("stop", { stopColor: "#22A7F0", offset: "100%" })
			) : _react2.default.createElement(
				"linearGradient",
				{ x1: "50%", y1: "0%", x2: "50%", y2: "100%", id: GRADIENT_ID },
				_react2.default.createElement("stop", { stopColor: "#2C3E50", offset: "0%" }),
				_react2.default.createElement("stop", { stopColor: "#34495E", offset: "100%" })
			)
		),
		_react2.default.createElement("rect", {
			x: x,
			y: y,
			width: width,
			height: height,
			fill: "url(#" + GRADIENT_ID + ")"
		})
	);
};

exports.default = Sky;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utilities = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GRADIENT_ID = (0, _utilities.genUID)();
const SHADOW_ID = (0, _utilities.genUID)();

const SHADOW_OFFSET_OUT = (0, _utilities.genUID)();
const SHADOW_BLUR_OUT = (0, _utilities.genUID)();

const Sun = ({ x = 50, y = 45, radius = 3, day = true }) => {
	return _react2.default.createElement(
		"g",
		null,
		_react2.default.createElement(
			"defs",
			null,
			day ? _react2.default.createElement(
				"linearGradient",
				{ x1: "50%", y1: "0%", x2: "50%", y2: "100%", id: GRADIENT_ID },
				_react2.default.createElement("stop", { stopColor: "#FBDA61", offset: "0%" }),
				_react2.default.createElement("stop", { stopColor: "#F76B1C", offset: "100%" })
			) : _react2.default.createElement(
				"linearGradient",
				{ x1: "50%", y1: "0%", x2: "50%", y2: "100%", id: GRADIENT_ID },
				_react2.default.createElement("stop", { stopColor: "#F2F1EF", offset: "0%" }),
				_react2.default.createElement("stop", { stopColor: "#DADFE1", offset: "100%" })
			),
			_react2.default.createElement(
				"filter",
				{
					x: "-5%",
					y: "-5%",
					width: "100%",
					height: "100%",
					filterUnits: "objectBoundingBox",
					id: SHADOW_ID
				},
				_react2.default.createElement("feOffset", { dx: "0", dy: "2", "in": "SourceAlpha", result: SHADOW_OFFSET_OUT }),
				_react2.default.createElement("feGaussianBlur", {
					stdDeviation: "2",
					"in": SHADOW_OFFSET_OUT,
					result: SHADOW_BLUR_OUT
				}),
				_react2.default.createElement("feColorMatrix", {
					values: "0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0",
					type: "matrix",
					"in": SHADOW_BLUR_OUT
				})
			)
		),
		_react2.default.createElement("circle", { cx: x, cy: y, r: radius, fill: "url(#" + GRADIENT_ID + ")" })
	);
};

exports.default = Sun;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

const path = __webpack_require__(2);
const webpack = __webpack_require__(4);

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
								"relay",
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
				include: [path.resolve(root, "src/frontend")],

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


/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map