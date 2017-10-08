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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
//define constants here because many of them depend on each other

/*
 ####  #    #  ####  
#      #    # #    # 
 ####  #    # #      
     # #    # #  ### 
#    #  #  #  #    # 
 ####    ##    ####
 */

const SVG_WIDTH = exports.SVG_WIDTH = 100;
const SVG_HEIGHT = exports.SVG_HEIGHT = 50;

/*
 ####  #       ####   ####  #    # 
#    # #      #    # #    # #   #  
#      #      #    # #      ####   
#      #      #    # #      #  #   
#    # #      #    # #    # #   #  
 ####  ######  ####   ####  #    # 
 */

const CLOCK_X = exports.CLOCK_X = SVG_WIDTH / 2;
const CLOCK_Y = exports.CLOCK_Y = SVG_HEIGHT;
const CLOCK_RADIUS = exports.CLOCK_RADIUS = SVG_HEIGHT * 0.9;
const CLOCK_LINE_LENGTH_INSIDE = exports.CLOCK_LINE_LENGTH_INSIDE = 0.5;
const CLOCK_LINE_LENGTH_OUTSIDE = exports.CLOCK_LINE_LENGTH_OUTSIDE = 1.5;
const CLOCK_DISTANCE_TO_LABEL = exports.CLOCK_DISTANCE_TO_LABEL = 1.5;

/*
 ####  #    # #   # 
#      #   #   # #  
 ####  ####     #   
     # #  #     #   
#    # #   #    #   
 ####  #    #   # 
 */

const SKY_X = exports.SKY_X = 0;
const SKY_Y = exports.SKY_Y = 0;
const SKY_GRADIENT_STOPS = exports.SKY_GRADIENT_STOPS = {
	day: {
		6: {
			from: {
				r: 240,
				g: 191,
				b: 59
			},
			to: {
				r: 44,
				g: 62,
				b: 80
			}
		},
		10: {
			from: {
				r: 137,
				g: 196,
				b: 244
			},
			to: {
				r: 34,
				g: 167,
				b: 240
			}
		},
		12: {
			from: {
				r: 137,
				g: 196,
				b: 244
			},
			to: {
				r: 34,
				g: 167,
				b: 240
			}
		},
		18: {
			from: {
				r: 249,
				g: 105,
				b: 14
			},
			to: {
				r: 249,
				g: 191,
				b: 59
			}
		}
	},
	night: {
		18: {
			from: {
				r: 44,
				g: 62,
				b: 80
			},
			to: {
				r: 52,
				g: 73,
				b: 94
			}
		},
		0: {
			from: {
				r: 44,
				g: 62,
				b: 80
			},
			to: {
				r: 52,
				g: 73,
				b: 94
			}
		},
		6: {
			from: {
				r: 44,
				g: 62,
				b: 80
			},
			to: {
				r: 52,
				g: 73,
				b: 94
			}
		}
	}
};

const calculateSkyGradient = exports.calculateSkyGradient = (hours = 0, day = true) => {
	const stops = day ? SKY_GRADIENT_STOPS.day : SKY_GRADIENT_STOPS.night;

	let stopKeys = Object.keys(stops).map(k => Number.parseFloat(k));
	let searchHours = day ? hours : hours < 18 ? hours + 24 : hours;

	let first, second;

	if (day) {
		stopKeys = stopKeys.sort((a, b) => {
			return a - b;
		});
	} else {
		stopKeys = stopKeys.map(n => n < 18 ? n + 24 : n).sort((a, b) => {
			return a - b;
		});
	}

	for (let i = 0; i < stopKeys.length; i++) {
		if (stopKeys[i] === searchHours) {
			second = stopKeys[i];
			first = stopKeys[i];
			break;
		} else if (stopKeys[i] > searchHours) {
			second = stopKeys[i];
			first = stopKeys[i - 1];

			break;
		} else if (i === stopKeys.length - 1) {
			//if nothing was found
			throw new Error("@devs: Fix the stops object for hour " + hours + "! No key in [" + stopKeys.join(",") + "] was bigger than " + searchHours + ". Apparently it is currently " + (day ? "day" : "night") + "time");
		}
	}

	first = first >= 24 ? first - 24 : first;
	second = second >= 24 ? second - 24 : second;

	const progress = second == first ? 0 : (hours - first) / (second - first);
	let gradient = { from: {}, to: {} };
	["r", "g", "b"].forEach(colorKey => {
		gradient.from[colorKey] = Math.round(stops[first].from[colorKey] * (1 - progress) + stops[second].from[colorKey] * progress);
		gradient.to[colorKey] = Math.round(stops[first].to[colorKey] * (1 - progress) + stops[second].to[colorKey] * progress);
	});

	return gradient;
};

/*
 ####  #    # #    # 
#      #    # ##   # 
 ####  #    # # #  # 
     # #    # #  # # 
#    # #    # #   ## 
 ####   ####  #    # 
 */

const SUN_RADIUS = exports.SUN_RADIUS = 3;
const SUN_ANIMATION_DURATION = exports.SUN_ANIMATION_DURATION = 1000;
const SUN_ANIMATION_STEPS = exports.SUN_ANIMATION_STEPS = 200;

/*
 ####  #####   ####  #    # #    # #####  
#    # #    # #    # #    # ##   # #    # 
#      #    # #    # #    # # #  # #    # 
#  ### #####  #    # #    # #  # # #    # 
#    # #   #  #    # #    # #   ## #    # 
 ####  #    #  ####   ####  #    # #####
 */

const GROUND_X = exports.GROUND_X = 0;
const GROUND_Y = exports.GROUND_Y = SVG_HEIGHT / 2;

const GROUND_WIDTH = exports.GROUND_WIDTH = SVG_WIDTH;
const GROUND_HEIGHT = exports.GROUND_HEIGHT = SVG_HEIGHT / 2;

/*
#####  # #    # ###### #####  
#    # # #    # #      #    # 
#    # # #    # #####  #    # 
#####  # #    # #      #####  
#   #  #  #  #  #      #   #  
#    # #   ##   ###### #    # 
*/

const RIVER_WIDTH = exports.RIVER_WIDTH = 1;
const RIVER_SEGMENTS = exports.RIVER_SEGMENTS = 2;
const RIVER_MIN_SEGMENT_LENGTH = exports.RIVER_MIN_SEGMENT_LENGTH = 25;
const RIVER_MAX_SEGMENT_LENGTH = exports.RIVER_MAX_SEGMENT_LENGTH = 40;

/*
#    # # ###### #    # #####   ####  #####  ##### 
#    # # #      #    # #    # #    # #    #   #   
#    # # #####  #    # #    # #    # #    #   #   
#    # # #      # ## # #####  #    # #####    #   
 #  #  # #      ##  ## #      #    # #   #    #   
  ##   # ###### #    # #       ####  #    #   # 
  */

const VIEWPORT_START_RAD = exports.VIEWPORT_START_RAD = Math.asin(1 - (CLOCK_RADIUS - GROUND_Y) / CLOCK_RADIUS);
const VIEWPORT_END_RAD = exports.VIEWPORT_END_RAD = Math.PI - VIEWPORT_START_RAD;
const VIEWPORT_WIDTH_RAD = exports.VIEWPORT_WIDTH_RAD = VIEWPORT_END_RAD - VIEWPORT_START_RAD;

const HOUR_STEP = exports.HOUR_STEP = VIEWPORT_WIDTH_RAD / 14;

/*
 ####  #    #   ##   #####   ####  #    #  ####  
#      #    #  #  #  #    # #    # #    # #      
 ####  ###### #    # #    # #    # #    #  ####  
     # #    # ###### #    # #    # # ## #      # 
#    # #    # #    # #    # #    # ##  ## #    # 
 ####  #    # #    # #####   ####  #    #  ####
 */

const DROP_SHADOW_ID = exports.DROP_SHADOW_ID = "landscape-drop-shadow-filter";
const DROP_SHADOW_X = exports.DROP_SHADOW_X = "-50%";
const DROP_SHADOW_Y = exports.DROP_SHADOW_Y = "-50%";
const DROP_SHADOW_WIDTH = exports.DROP_SHADOW_WIDTH = "200%";
const DROP_SHADOW_HEIGHT = exports.DROP_SHADOW_HEIGHT = "200%";

/*
###### #    # #    #  ####  ##### #  ####  #    #  ####  
#      #    # ##   # #    #   #   # #    # ##   # #      
#####  #    # # #  # #        #   # #    # # #  #  ####  
#      #    # #  # # #        #   # #    # #  # #      # 
#      #    # #   ## #    #   #   # #    # #   ## #    # 
#       ####  #    #  ####    #   #  ####  #    #  ####
*/

/**
 * Calculates the suns position based on the current time in hours
 * @param {Number} hours 
 * @returns {Object} An object containing the 'x' and 'y' coordinate
 */
const calculateSunPosition = exports.calculateSunPosition = hours => {
	//calculate the sun's position
	const SUN_POS_RAD = VIEWPORT_START_RAD + HOUR_STEP + //add one because we don't want the sun directly on the horizon
	//because the clock isn't 0-12 we have to map the time to the interval 6-18 / 18-6
	(hours < 6 ? 6 + hours : hours - 6) % 12 * HOUR_STEP;

	return {
		x: CLOCK_X + CLOCK_RADIUS * Math.cos(Math.PI - SUN_POS_RAD),
		y: CLOCK_Y - CLOCK_RADIUS * Math.sin(Math.PI - SUN_POS_RAD)
	};
};

const calculateSunPositionInAnimation = exports.calculateSunPositionInAnimation = passed => {
	//calculate the sun's position
	let sunPosRad = 0;
	if (passed < SUN_ANIMATION_DURATION / 2) {
		sunPosRad = passed == 0 ? 0 : VIEWPORT_START_RAD + 13 * HOUR_STEP + 2 * HOUR_STEP / SUN_ANIMATION_DURATION * passed;
	} else {
		sunPosRad = passed == 0 ? 0 : VIEWPORT_START_RAD + 2 * HOUR_STEP / SUN_ANIMATION_DURATION * (passed - SUN_ANIMATION_DURATION / 2);
	}

	return {
		x: CLOCK_X + CLOCK_RADIUS * Math.cos(Math.PI - sunPosRad),
		y: CLOCK_Y - CLOCK_RADIUS * Math.sin(Math.PI - sunPosRad)
	};
};

/**
 * A simple range check whether it's currently daytime
 * @param {Number} hours 
 * @returns {Boolean} Whether it's daytime
 */
const isDay = exports.isDay = hours => hours >= 6 && hours < 18;

/**
 * Generates a random y coordinate for a river segment
 * @returns {Number} The y coordinate
 */
const generateRandomRiverSegmentYCoordinate = () => {
	return GROUND_Y + RIVER_WIDTH * 1.5 + Math.random() * (GROUND_HEIGHT - RIVER_WIDTH * 1.5); //also add a little margin
};

/**
 * Generates random river coordinates
 * @returns {Array} An array containing objects with 'x' and 'y' values
 */
const generateRiverCoordinates = exports.generateRiverCoordinates = () => {
	const riverCoordinates = [];
	let riverWidth = 0;

	//generate a random starting height
	const y = generateRandomRiverSegmentYCoordinate();

	riverCoordinates.push({ x: -10, y }); //add this one so the line is straight from the beginning
	riverCoordinates.push({ x: 0, y });

	//generate the edge coordinates and the segment lengths
	for (let i = 0; i < RIVER_SEGMENTS; i++) {
		let width = 0,
		    y = generateRandomRiverSegmentYCoordinate(),
		    offset = Math.random() * (SVG_WIDTH / RIVER_SEGMENTS / 2);
		if (i === RIVER_SEGMENTS - 1) {
			//the remaining length
			width = SVG_WIDTH - riverWidth;
		} else {
			width = RIVER_MIN_SEGMENT_LENGTH + Math.random() * (SVG_WIDTH / RIVER_SEGMENTS / 2);
		}
		riverCoordinates.push({ x: riverWidth + offset, y });
		riverCoordinates.push({ x: riverWidth + offset + width, y });

		riverWidth += width + offset;
	}

	return riverCoordinates;
};

/**
 * Rotates a point in 2d space around the origin
 * @param {Object} point The point to rotate. An object with an 'x' and 'y' value 
 * @param {*} angle The angle to rotate
 * @param {*} origin The origin to rotate the point around. An object with an 'x' and 'y' value
 * @returns {Object} The rotated point. An object with an 'x' and 'y' value 
 */
const rotatePoint = ({ x, y }, angle = 0, {
	x: xOrigin,

	y: yOrigin
}) => {
	let s = Math.sin(angle),
	    c = Math.cos(angle);

	return {
		x: (x - xOrigin) * c - (y - yOrigin) * s + xOrigin,
		y: (x - xOrigin) * s + (y - yOrigin) * c + yOrigin
	};
};

/**
 * A function to check whether a single point intersects with the river
 * @param {Object} point The point which could intersect the river. An object with an 'x' and 'y' value 
 * @param {Array} riverCoordinates The river segment coordinates. An array with objects containing an 'x' and 'y' value 
 * @returns {Boolean} Whether the point intersects the river
 */
const intersectsRiver = ({ x, y }, riverCoordinates = []) => {
	//we can approximate the tree trunk as a point which simplifies the problem a lot
	for (let i = 0; i < riverCoordinates.length - 1; i++) {
		if (x > riverCoordinates[i].x && x < riverCoordinates[i + 1].x) {
			//this is the closest segment
			//first perform a low cost test
			if (riverCoordinates[i].y < riverCoordinates[i + 1].y ? y < riverCoordinates[i].y - RIVER_WIDTH || y > riverCoordinates[i + 1].y + RIVER_WIDTH : y > riverCoordinates[i].y + RIVER_WIDTH || y < riverCoordinates[i + 1].y - RIVER_WIDTH) {
				return false;
			}

			//for a real check we have to rotate this segment to align with the x axis
			//first we calculate the angle
			const angle = Math.atan((riverCoordinates[i].y - riverCoordinates[i + 1].y) / (riverCoordinates[i].x - riverCoordinates[i + 1].x));
			//now we have to rotate two points of the rectangle and the trunk coordinate back
			const coordinate = rotatePoint({ x, y }, -angle, { x: 0, y: 0 });
			const rectPoint1 = rotatePoint({
				x: riverCoordinates[i].x,
				y: riverCoordinates[i].y
			}, -angle, { x: 0, y: 0 });
			const rectPoint2 = rotatePoint({
				x: riverCoordinates[i + 1].x,
				y: riverCoordinates[i + 1].y
			}, -angle, { x: 0, y: 0 });

			//and now we can check whether the point is inside the rotated rectangle
			if (angle > 0) {
				//rectPoint2.y > rectPoint1.y
				return coordinate.x >= rectPoint1.x - RIVER_WIDTH && coordinate.x <= rectPoint2.x + RIVER_WIDTH && coordinate.y >= rectPoint1.y - RIVER_WIDTH && coordinate.y <= rectPoint2.y + RIVER_WIDTH;
			} else {
				return coordinate.x >= rectPoint1.x - RIVER_WIDTH && coordinate.x <= rectPoint2.x + RIVER_WIDTH && coordinate.y <= rectPoint1.y + RIVER_WIDTH && coordinate.y >= rectPoint2.y - RIVER_WIDTH;
			}
		}
	}
	return false;
};

/**
 * Generates random tree coordinates while checking for river intersection
 * @param {Number} count The amount of coordinates to generate
 * @param {Array} riverCoordinates The river segment coordinates
 * @returns {Array} An array containing objects with an 'x' and 'y' value 
 */
const generatePlantCoordinates = exports.generatePlantCoordinates = (count = 0, riverCoordinates = []) => {
	const treeCoordinates = [];
	for (let i = 0; i < count; i++) {
		let x, y;
		while (!x || !y || intersectsRiver({ x, y }, riverCoordinates)) {
			x = Math.random() * GROUND_WIDTH;
			y = GROUND_Y + 5 + Math.random() * (GROUND_HEIGHT - 10);
		}
		treeCoordinates.push({
			x,
			y
		});
	}
	return treeCoordinates;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utilities = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TRUNK_GRADIENT_ID = (0, _utilities.genUID)();

class Trunk extends _react2.default.PureComponent {
	constructor(...args) {
		var _temp;

		return _temp = super(...args), this.render = () => {
			const { x, y } = this.props;
			return _react2.default.createElement(
				"g",
				null,
				_react2.default.createElement(
					"defs",
					null,
					_react2.default.createElement(
						"linearGradient",
						{
							x1: "0%",
							y1: "50%",
							x2: "100%",
							y2: "50%",
							id: TRUNK_GRADIENT_ID
						},
						_react2.default.createElement("stop", { stopColor: "#C37850", offset: "0%" }),
						_react2.default.createElement("stop", { stopColor: "#F39C12", offset: "100%" })
					)
				),
				_react2.default.createElement("rect", {
					fill: "url(#" + TRUNK_GRADIENT_ID + ")",
					x: x,
					y: y,
					width: "1",
					height: "4"
				})
			);
		}, _temp;
	}

}

exports.default = Trunk;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = {"KEY_PATH":"./keys/server.key","CERT_PATH":"./keys/server.crt","HTTP_PORT":8080,"API_URL":"","CLIENT_ID":1,"CLIENT_SECRET":""}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const http2 = __webpack_require__(9);
const express = __webpack_require__(10);
const compression = __webpack_require__(11);
const promiseRequest = __webpack_require__(12);

const path = __webpack_require__(4);
const fs = __webpack_require__(13);

const {
	KEY_PATH,
	CERT_PATH,
	HTTP_PORT,
	API_URL,
	CLIENT_ID,
	CLIENT_SECRET
} = __webpack_require__(5);
const page = __webpack_require__(14);

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
	const webpack = __webpack_require__(6);
	const webpackConfig = __webpack_require__(43);
	const compiler = webpack(webpackConfig);

	expressServer.use(__webpack_require__(44)(compiler, {
		publicPath: webpackConfig.output.publicPath
	}));

	expressServer.use(__webpack_require__(45)(compiler));

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
/* 9 */
/***/ (function(module, exports) {

module.exports = require("spdy");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("request-promise-native");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(15);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _server = __webpack_require__(16);

var _server2 = _interopRequireDefault(_server);

var _universalRouter = __webpack_require__(17);

var _universalRouter2 = _interopRequireDefault(_universalRouter);

var _Api = __webpack_require__(18);

var _Api2 = _interopRequireDefault(_Api);

var _routes = __webpack_require__(21);

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
/* 15 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("universal-router");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _isomorphicFetch = __webpack_require__(19);

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _relayRuntime = __webpack_require__(20);

var _config = __webpack_require__(5);

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
/* 19 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("relay-runtime");

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _App = __webpack_require__(22);

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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _withStyles = __webpack_require__(23);

var _withStyles2 = _interopRequireDefault(_withStyles);

var _App = __webpack_require__(24);

var _App2 = _interopRequireDefault(_App);

var _Landscape = __webpack_require__(30);

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
/* 23 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__(25);
    var insertCss = __webpack_require__(27);

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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(26)(undefined);
// imports


// module
exports.push([module.i, "html,\nbody {\n  margin: 0;\n  padding: 0; }\n\n.src-frontend-___App__background___1h6Y0 {\n  -webkit-filter: drop-shadow(-1px -1px 2px rgba(0, 0, 0, 0.5));\n          filter: drop-shadow(-1px -1px 2px rgba(0, 0, 0, 0.5)); }\n", ""]);

// exports
exports.locals = {
	"background": "src-frontend-___App__background___1h6Y0"
};

/***/ }),
/* 26 */
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _stringify = __webpack_require__(28);

var _stringify2 = _interopRequireDefault(_stringify);

var _slicedToArray2 = __webpack_require__(29);

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
/* 28 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Clock = __webpack_require__(31);

var _Clock2 = _interopRequireDefault(_Clock);

var _Ground = __webpack_require__(32);

var _Ground2 = _interopRequireDefault(_Ground);

var _Sky = __webpack_require__(38);

var _Sky2 = _interopRequireDefault(_Sky);

var _Sun = __webpack_require__(40);

var _Sun2 = _interopRequireDefault(_Sun);

var _Hills = __webpack_require__(41);

var _Hills2 = _interopRequireDefault(_Hills);

var _DropShadowFilter = __webpack_require__(42);

var _DropShadowFilter2 = _interopRequireDefault(_DropShadowFilter);

var _constants = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Landscape extends _react2.default.PureComponent {
	constructor() {
		super();

		_initialiseProps.call(this);

		const d = new Date();
		this.state = { hours: d.getHours() + d.getMinutes() / 60 };
	}

	render() {
		const { hours, overrideSunX, overrideSunY } = this.state;

		const day = (0, _constants.isDay)(hours);

		const { x: SUN_X, y: SUN_Y } = (0, _constants.calculateSunPosition)(hours);

		return _react2.default.createElement(
			"svg",
			{
				viewBox: "0 0 " + _constants.SVG_WIDTH + " " + _constants.SVG_HEIGHT,
				preserveAspectRatio: "xMinYMin"
			},
			_react2.default.createElement(
				"defs",
				null,
				_react2.default.createElement(_DropShadowFilter2.default, null)
			),
			_react2.default.createElement(_Sky2.default, { day: day, hours: this.state.hours, sunX: SUN_X, sunY: SUN_Y }),
			_react2.default.createElement(_Clock2.default, { clockSift: day ? 19 : 31, day: day }),
			_react2.default.createElement(_Sun2.default, {
				x: overrideSunX ? overrideSunX : SUN_X,
				y: overrideSunY ? overrideSunY : SUN_Y,
				day: day
			}),
			_react2.default.createElement(_Hills2.default, null),
			_react2.default.createElement(_Ground2.default, null)
		);
	}
}

var _initialiseProps = function () {
	this.animateSun = (passed = 0) => {
		if (passed >= _constants.SUN_ANIMATION_DURATION) {
			clearTimeout(this.morning);
			this.setState({ overrideSunX: undefined, overrideSunY: undefined });
			return;
		}
		const { x, y } = (0, _constants.calculateSunPositionInAnimation)(passed);
		this.setState({ overrideSunX: x, overrideSunY: y });

		this.morning = setTimeout(() => {
			this.animateSun(passed + _constants.SUN_ANIMATION_DURATION / _constants.SUN_ANIMATION_STEPS);
		}, _constants.SUN_ANIMATION_DURATION / _constants.SUN_ANIMATION_STEPS);
	};

	this.componentDidMount = () => {
		/*this.updateInterval = setInterval(() => {
  	const d = new Date();
  	this.setState({ hours: d.getHours() + d.getMinutes() / 60 + d.getSeconds() / 3600 });
  }, 30000);*/
		this.updateInterval = setInterval(() => {
			const d = new Date();
			let hours = d.getMinutes() % 24 + d.getSeconds() / 60 + d.getMilliseconds() / 60000;
			if (this.state.hours < 6 && hours >= 6 || this.state.hours < 18 && hours >= 18) {
				this.animateSun();
			}
			this.setState({ hours });
		}, 100);
	};

	this.componentWillUnmount = () => {
		if (this.updateInterval) {
			clearInterval(this.updateInterval);
		}
	};
};

exports.default = Landscape;

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

var _constants = __webpack_require__(2);

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

class Clock extends _react2.default.PureComponent {
	constructor(...args) {
		var _temp;

		return _temp = super(...args), this.render = () => {
			const { clockShift = 19, day = true } = this.props;
			const opacity = day ? "0.2" : "0.1";

			return _react2.default.createElement(
				"g",
				{ className: "clock" },
				_react2.default.createElement("circle", {
					cx: _constants.CLOCK_X,
					cy: _constants.CLOCK_Y,
					r: _constants.CLOCK_RADIUS,
					stroke: "#fff",
					strokeWidth: "0.05",
					fillOpacity: "0",
					strokeOpacity: opacity
				}),
				[...Array(14)].map((e, i) => {
					if (i === 0) {
						return null;
					}

					const radOffset = _constants.VIEWPORT_START_RAD + _constants.HOUR_STEP * i;
					//calc the coordinates on the circle
					const { x: refX, y: refY } = caluclateScaledCircleCoordinate({ x: _constants.CLOCK_X, y: _constants.CLOCK_Y }, _constants.CLOCK_RADIUS, radOffset);

					//then caluclate the slope
					const slope = refX === _constants.CLOCK_X ? false : (refY - _constants.CLOCK_Y) / (refX - _constants.CLOCK_X);

					//then use pythagorean theorem
					let { dx, dy } = calculateCoordinateOffsetByDistance(slope, _constants.CLOCK_LINE_LENGTH_OUTSIDE);
					let { dx: dx2, dy: dy2 } = calculateCoordinateOffsetByDistance(slope, _constants.CLOCK_LINE_LENGTH_INSIDE);
					let { dx: dxText, dy: dyText } = calculateCoordinateOffsetByDistance(slope, _constants.CLOCK_DISTANCE_TO_LABEL);

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
							toHour(clockShift - i) + ":00"
						)
					);
				})
			);
		}, _temp;
	}

}

exports.default = Clock;

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

var _constants = __webpack_require__(2);

var _River = __webpack_require__(33);

var _River2 = _interopRequireDefault(_River);

var _GroundDecoration = __webpack_require__(34);

var _GroundDecoration2 = _interopRequireDefault(_GroundDecoration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GRADIENT_ID = (0, _utilities.genUID)();

class Ground extends _react2.default.PureComponent {
	constructor(...args) {
		var _temp;

		return _temp = super(...args), this.render = () => {
			const {
				decorationCount = 10,
				riverCoordinates = (0, _constants.generateRiverCoordinates)(),
				decorationCoordinates: decCoords
			} = this.props;

			let decorationCoordinates = [];

			if (!decCoords) {
				decorationCoordinates = (0, _constants.generatePlantCoordinates)(decorationCount, riverCoordinates);
			}

			return _react2.default.createElement(
				"g",
				{ className: "ground" },
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
					x: _constants.GROUND_X,
					y: _constants.GROUND_Y,
					width: _constants.GROUND_WIDTH,
					height: _constants.GROUND_HEIGHT,
					fill: "url(#" + GRADIENT_ID + ")"
				}),
				_react2.default.createElement(_River2.default, { coordinates: riverCoordinates }),
				_react2.default.createElement(_GroundDecoration2.default, { coordinates: decorationCoordinates })
			);
		}, _temp;
	}

}

exports.default = Ground;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utilities = __webpack_require__(1);

var _constants = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GRADIENT_ID = (0, _utilities.genUID)();

class River extends _react2.default.PureComponent {
	constructor(...args) {
		var _temp;

		return _temp = super(...args), this.render = () => {
			const { coordinates } = this.props;
			return _react2.default.createElement(
				"g",
				{ className: "river" },
				_react2.default.createElement("polyline", {
					id: "Path-4",
					points: coordinates.map(obj => obj.x + " " + obj.y).join(" "),
					stroke: "#4990E2",
					fillOpacity: "0",
					strokeWidth: _constants.RIVER_WIDTH
				})
			);
		}, _temp;
	}

}

exports.default = River;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utilities = __webpack_require__(1);

var _constants = __webpack_require__(2);

var _Angular = __webpack_require__(35);

var _Angular2 = _interopRequireDefault(_Angular);

var _Fir = __webpack_require__(36);

var _Fir2 = _interopRequireDefault(_Fir);

var _Oval = __webpack_require__(37);

var _Oval2 = _interopRequireDefault(_Oval);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class GroundDecoration extends _react2.default.PureComponent {
	constructor(...args) {
		var _temp;

		return _temp = super(...args), this.render = () => {
			const { coordinates, treeType = "mixed" } = this.props;

			return _react2.default.createElement(
				"g",
				{ className: "forest" },
				_react2.default.createElement("defs", null),
				coordinates.sort(({ y: y1 }, { y: y2 }) => {
					return y1 - y2;
				}).map(({ x, y }, index) => {
					let type = treeType;
					if (type === "mixed") {
						const rnd = Math.random();
						if (rnd < 1 / 3) {
							type = _Oval2.default;
						} else if (rnd < 2 / 3) {
							type = _Angular2.default;
						} else {
							type = _Fir2.default;
						}
					}

					return _react2.default.createElement(type, { key: index, x, y });
				})
			);
		}, _temp;
	}

}

exports.default = GroundDecoration;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utilities = __webpack_require__(1);

var _constants = __webpack_require__(2);

var _Trunk = __webpack_require__(3);

var _Trunk2 = _interopRequireDefault(_Trunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LEAF_GRADIENT_ID = (0, _utilities.genUID)();

class AngularTree extends _react2.default.PureComponent {
	constructor(...args) {
		var _temp;

		return _temp = super(...args), this.render = () => {
			const { x, y } = this.props;
			return _react2.default.createElement(
				"g",
				{
					className: "angular",
					transform: "translate(" + x + "," + y + ")",
					filter: "url(#" + _constants.DROP_SHADOW_ID + ")"
				},
				_react2.default.createElement(
					"defs",
					null,
					_react2.default.createElement(
						"linearGradient",
						{
							x1: "0%",
							y1: "50%",
							x2: "100%",
							y2: "50%",
							id: LEAF_GRADIENT_ID
						},
						_react2.default.createElement("stop", { stopColor: "#8CBE50", offset: "0%" }),
						_react2.default.createElement("stop", { stopColor: "#78A050", offset: "100%" })
					)
				),
				_react2.default.createElement(_Trunk2.default, { x: "0", y: "-4", width: "1", height: "4" }),
				_react2.default.createElement("polygon", {
					fill: "url(#" + LEAF_GRADIENT_ID + ")",
					points: "-0.5 -2 1.5 -2 2.5 -4 0.5 -8 -1.5 -4"
				})
			);
		}, _temp;
	}

}

exports.default = AngularTree;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utilities = __webpack_require__(1);

var _constants = __webpack_require__(2);

var _Trunk = __webpack_require__(3);

var _Trunk2 = _interopRequireDefault(_Trunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LEAF_GRADIENT_ID = (0, _utilities.genUID)();

class OvalTree extends _react2.default.PureComponent {
	constructor(...args) {
		var _temp;

		return _temp = super(...args), this.render = () => {
			const { x, y } = this.props;
			return _react2.default.createElement(
				"g",
				{
					className: "fir",
					transform: "translate(" + x + "," + y + ")",
					filter: "url(#" + _constants.DROP_SHADOW_ID + ")"
				},
				_react2.default.createElement(
					"defs",
					null,
					_react2.default.createElement(
						"linearGradient",
						{
							x1: "0%",
							y1: "50%",
							x2: "100%",
							y2: "50%",
							id: LEAF_GRADIENT_ID
						},
						_react2.default.createElement("stop", { stopColor: "#8CBE50", offset: "0%" }),
						_react2.default.createElement("stop", { stopColor: "#78A050", offset: "100%" })
					)
				),
				_react2.default.createElement(_Trunk2.default, { x: "0", y: "-4", width: "1", height: "4" }),
				_react2.default.createElement("polygon", {
					fill: "url(#" + LEAF_GRADIENT_ID + ")",
					points: "-1.5 -2.5 2.5 -2.5 1.5 -5 2.5 -5 0.5 -8 -1.5 -5 -0.5 -5"
				})
			);
		}, _temp;
	}

}

exports.default = OvalTree;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utilities = __webpack_require__(1);

var _constants = __webpack_require__(2);

var _Trunk = __webpack_require__(3);

var _Trunk2 = _interopRequireDefault(_Trunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LEAF_GRADIENT_ID = (0, _utilities.genUID)();

class OvalTree extends _react2.default.PureComponent {
	constructor(...args) {
		var _temp;

		return _temp = super(...args), this.render = () => {
			const { x, y } = this.props;
			return _react2.default.createElement(
				"g",
				{
					className: "oval",
					transform: "translate(" + x + "," + y + ")",
					filter: "url(#" + _constants.DROP_SHADOW_ID + ")"
				},
				_react2.default.createElement(
					"defs",
					null,
					_react2.default.createElement(
						"linearGradient",
						{
							x1: "0%",
							y1: "50%",
							x2: "100%",
							y2: "50%",
							id: LEAF_GRADIENT_ID
						},
						_react2.default.createElement("stop", { stopColor: "#8CBE50", offset: "0%" }),
						_react2.default.createElement("stop", { stopColor: "#78A050", offset: "100%" })
					)
				),
				_react2.default.createElement(_Trunk2.default, { x: "0", y: "-4", width: "1", height: "4" }),
				_react2.default.createElement("path", {
					d: "M0.75,-2 C1.15,-2 2.35,-2.5 2.35,-4 C2.35,-6 1.35,-8 0.65,-8 C-0.15,-8 -1.25,-6 -1.25,-4 C-1.25,-2.5 -0.25,-2 0.75,-2 Z",
					fill: "url(#" + LEAF_GRADIENT_ID + ")"
				})
			);
		}, _temp;
	}

}

exports.default = OvalTree;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utilities = __webpack_require__(1);

var _constants = __webpack_require__(2);

var _DefaultCloud = __webpack_require__(39);

var _DefaultCloud2 = _interopRequireDefault(_DefaultCloud);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GRADIENT_ID = (0, _utilities.genUID)();

class Sky extends _react2.default.PureComponent {
	constructor(...args) {
		var _temp;

		return _temp = super(...args), this.render = () => {
			const { hours = 0, day = true, sunX = 50, sunY = 45 } = this.props;

			const gradient = (0, _constants.calculateSkyGradient)(hours, day);

			return _react2.default.createElement(
				"g",
				{ className: "sky" },
				_react2.default.createElement(
					"defs",
					null,
					_react2.default.createElement(
						"linearGradient",
						{
							x1: 100 * sunX / _constants.SVG_WIDTH + "%",
							y1: "0%",
							x2: "50%",
							y2: "100%",
							id: GRADIENT_ID
						},
						_react2.default.createElement("stop", {
							stopColor: "#" + Object.values(gradient.from).map(v => v.toString(16)).join(""),
							offset: "0%"
						}),
						_react2.default.createElement("stop", {
							stopColor: "#" + Object.values(gradient.to).map(v => v.toString(16)).join(""),
							offset: "100%"
						})
					)
				),
				_react2.default.createElement("rect", {
					x: _constants.SKY_X,
					y: _constants.SKY_Y,
					width: _constants.SVG_WIDTH,
					height: _constants.SVG_HEIGHT,
					fill: "url(#" + GRADIENT_ID + ")"
				}),
				_react2.default.createElement(_DefaultCloud2.default, { x: 50, y: 10 })
			);
		}, _temp;
	}

}

exports.default = Sky;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utilities = __webpack_require__(1);

var _constants = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Cloud extends _react2.default.PureComponent {
	constructor(...args) {
		var _temp;

		return _temp = super(...args), this.render = () => {
			const { x, y } = this.props;

			return _react2.default.createElement(
				"g",
				{
					className: "cloud",
					filter: "url(#" + _constants.DROP_SHADOW_ID + ")",
					transform: "translate(" + x + "," + y + ")"
				},
				_react2.default.createElement("path", {
					d: "M12,3 C12,1.5 11,0.6 9.8,0.65 C9.5,0.65 9.3,0.7 9,0.8 C8.5,0.3 7.9,0 7,0 C6.2,0 5.4,0.5 5,1.2 C4.5,0.8 4,0.7 3.5,0.7 C3,0.7 2.4,0.9 2,1.3 C1.9,1.3 1.7,1.2 1.6,1.2 C0.6,1.2 0,2 0,3 L12,3 Z",
					fill: "#FFFFFF"
				})
			);
		}, _temp;
	}
	/*componentDidMount = () => {
 	const windStrength = this.props.windStrength
 		? this.props.windStrength
 		: 7500;
 	const moveInterval = this.props.moveInterval
 		? this.props.moveInterval
 		: 100;
 		this.moveInterval = setInterval(() => {
 		this.setState({
 			dx: this.state.dx + SVG_WIDTH / windStrength
 		});
 	}, moveInterval);
 };
 	componentWillUnmount = () => {
 	if (this.moveInterval) {
 		clearInterval(this.moveInterval);
 	}
 };*/

}

exports.default = Cloud;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utilities = __webpack_require__(1);

var _constants = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GRADIENT_ID = (0, _utilities.genUID)();
const SHADOW_ID = (0, _utilities.genUID)();

const SHADOW_OFFSET_OUT = (0, _utilities.genUID)();
const SHADOW_BLUR_OUT = (0, _utilities.genUID)();

class Sun extends _react2.default.PureComponent {
	constructor(...args) {
		var _temp;

		return _temp = super(...args), this.render = () => {
			const { x = 50, y = 45, day = true } = this.props;

			return _react2.default.createElement(
				"g",
				{ className: "sun", filter: "url(#" + _constants.DROP_SHADOW_ID + ")" },
				_react2.default.createElement(
					"defs",
					null,
					day ? _react2.default.createElement(
						"linearGradient",
						{
							x1: "50%",
							y1: "0%",
							x2: "50%",
							y2: "100%",
							id: GRADIENT_ID
						},
						_react2.default.createElement("stop", { stopColor: "#FBDA61", offset: "0%" }),
						_react2.default.createElement("stop", { stopColor: "#F76B1C", offset: "100%" })
					) : _react2.default.createElement(
						"linearGradient",
						{
							x1: "50%",
							y1: "0%",
							x2: "50%",
							y2: "100%",
							id: GRADIENT_ID
						},
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
						_react2.default.createElement("feOffset", {
							dx: "0",
							dy: "2",
							"in": "SourceAlpha",
							result: SHADOW_OFFSET_OUT
						}),
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
				_react2.default.createElement("circle", {
					cx: x,
					cy: y,
					r: _constants.SUN_RADIUS,
					fill: "url(#" + GRADIENT_ID + ")"
				})
			);
		}, _temp;
	}

}

exports.default = Sun;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utilities = __webpack_require__(1);

var _constants = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const HILLS_GRADIENT_ID = (0, _utilities.genUID)();

class Hills extends _react2.default.PureComponent {
	constructor(...args) {
		var _temp;

		return _temp = super(...args), this.render = () => {
			return _react2.default.createElement(
				"g",
				{ className: "hills", filter: "url(#" + _constants.DROP_SHADOW_ID + ")" },
				_react2.default.createElement(
					"defs",
					null,
					_react2.default.createElement(
						"linearGradient",
						{
							x1: "0%",
							y1: "50%",
							x2: "100%",
							y2: "50%",
							id: HILLS_GRADIENT_ID
						},
						_react2.default.createElement("stop", { stopColor: "#1E824C", offset: "0%" }),
						_react2.default.createElement("stop", { stopColor: "#26A65B", offset: "100%" })
					)
				),
				_react2.default.createElement("ellipse", {
					cx: "15",
					cy: _constants.GROUND_Y + 10,
					rx: "20",
					ry: "15",
					fill: "url(#" + HILLS_GRADIENT_ID + ")"
				}),
				_react2.default.createElement("ellipse", {
					cx: "85",
					cy: _constants.GROUND_Y + 10,
					rx: "20",
					ry: "15",
					fill: "url(#" + HILLS_GRADIENT_ID + ")"
				}),
				_react2.default.createElement("ellipse", {
					cx: "50",
					cy: _constants.GROUND_Y + 10,
					rx: "30",
					ry: "20",
					fill: "url(#" + HILLS_GRADIENT_ID + ")"
				})
			);
		}, _temp;
	}

}

exports.default = Hills;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _utilities = __webpack_require__(1);

var _constants = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const OFFSET_OUT = (0, _utilities.genUID)();
const BLUR_OUT = (0, _utilities.genUID)();
const MATRIX_OUT = (0, _utilities.genUID)();

class DropShadowFilter extends _react2.default.PureComponent {
	constructor(...args) {
		var _temp;

		return _temp = super(...args), this.render = () => {
			const { dx = 0.05, dy = 0.1, deviation = 0.05 } = this.props;
			return _react2.default.createElement(
				"filter",
				{
					x: _constants.DROP_SHADOW_X,
					y: _constants.DROP_SHADOW_Y,
					width: _constants.DROP_SHADOW_WIDTH,
					height: _constants.DROP_SHADOW_HEIGHT,
					filterUnits: "objectBoundingBox",
					id: _constants.DROP_SHADOW_ID
				},
				_react2.default.createElement("feOffset", { dx: dx, dy: dy, "in": "SourceGraphic", result: OFFSET_OUT }),
				_react2.default.createElement("feGaussianBlur", {
					stdDeviation: deviation,
					"in": OFFSET_OUT,
					result: BLUR_OUT
				}),
				_react2.default.createElement("feColorMatrix", {
					values: "0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.4 0",
					type: "matrix",
					"in": BLUR_OUT,
					result: MATRIX_OUT
				}),
				_react2.default.createElement(
					"feMerge",
					null,
					_react2.default.createElement("feMergeNode", { "in": MATRIX_OUT }),
					_react2.default.createElement("feMergeNode", { "in": "SourceGraphic" })
				)
			);
		}, _temp;
	}

}

exports.default = DropShadowFilter;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

const path = __webpack_require__(4);
const webpack = __webpack_require__(6);

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
/* 44 */
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map