//define constants here because many of them depend on each other

export const ANIMATION_FPS_CAP = 30;

/*
 ####  #    #  ####  
#      #    # #    # 
 ####  #    # #      
     # #    # #  ### 
#    #  #  #  #    # 
 ####    ##    ####
 */

export const SVG_WIDTH = 100;
export const SVG_HEIGHT = 50;

/*
 ####  #       ####   ####  #    # 
#    # #      #    # #    # #   #  
#      #      #    # #      ####   
#      #      #    # #      #  #   
#    # #      #    # #    # #   #  
 ####  ######  ####   ####  #    # 
 */

export const CLOCK_X = SVG_WIDTH / 2;
export const CLOCK_Y = SVG_HEIGHT;
export const CLOCK_RADIUS = SVG_HEIGHT * 0.9;
export const CLOCK_LINE_LENGTH_INSIDE = 0.5;
export const CLOCK_LINE_LENGTH_OUTSIDE = 1.5;
export const CLOCK_DISTANCE_TO_LABEL = 1.5;

/*
 ####  #    # #   # 
#      #   #   # #  
 ####  ####     #   
     # #  #     #   
#    # #   #    #   
 ####  #    #   # 
 */
export const SKY_X = 0;
export const SKY_Y = 0;
export const SKY_WIDTH = SVG_WIDTH;
export const SKY_HEIGHT = SVG_HEIGHT / 2;
export const SKY_CLOUD_COUNT = 2;

export const MIN_WIND_STRENGTH = 1;
export const MAX_WIND_STRENGTH = 2;

export const CLOUD_MOVE_INTERVAL = 25;

export const SKY_GRADIENT_STOPS = {
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

export const calculateSkyGradient = (hours = 0, day = true) => {
	const stops = day ? SKY_GRADIENT_STOPS.day : SKY_GRADIENT_STOPS.night;

	let stopKeys = Object.keys(stops).map(k => Number.parseFloat(k));
	let searchHours = day ? hours : hours < 18 ? hours + 24 : hours;

	let first, second;

	if (day) {
		stopKeys = stopKeys.sort((a, b) => {
			return a - b;
		});
	} else {
		stopKeys = stopKeys.map(n => (n < 18 ? n + 24 : n)).sort((a, b) => {
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
			throw new Error(
				"@devs: Fix the stops object for hour " +
					hours +
					"! No key in [" +
					stopKeys.join(",") +
					"] was bigger than " +
					searchHours +
					". Apparently it is currently " +
					(day ? "day" : "night") +
					"time"
			);
		}
	}

	first = first >= 24 ? first - 24 : first;
	second = second >= 24 ? second - 24 : second;

	const progress = second == first ? 0 : (hours - first) / (second - first);
	let gradient = { from: {}, to: {} };
	["r", "g", "b"].forEach(colorKey => {
		gradient.from[colorKey] = Math.round(
			stops[first].from[colorKey] * (1 - progress) +
				stops[second].from[colorKey] * progress
		);
		gradient.to[colorKey] = Math.round(
			stops[first].to[colorKey] * (1 - progress) +
				stops[second].to[colorKey] * progress
		);
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

export const SUN_RADIUS = 3;
export const SUN_ANIMATION_DURATION = 4000;

/*
 ####  #####   ####  #    # #    # #####  
#    # #    # #    # #    # ##   # #    # 
#      #    # #    # #    # # #  # #    # 
#  ### #####  #    # #    # #  # # #    # 
#    # #   #  #    # #    # #   ## #    # 
 ####  #    #  ####   ####  #    # #####
 */

export const GROUND_X = 0;
export const GROUND_Y = SVG_HEIGHT / 2;

export const GROUND_WIDTH = SVG_WIDTH;
export const GROUND_HEIGHT = SVG_HEIGHT / 2;

/*
#####  # #    # ###### #####  
#    # # #    # #      #    # 
#    # # #    # #####  #    # 
#####  # #    # #      #####  
#   #  #  #  #  #      #   #  
#    # #   ##   ###### #    # 
*/

export const RIVER_WIDTH = 1;
export const RIVER_SEGMENTS = 2;
export const RIVER_MIN_SEGMENT_LENGTH = 25;
export const RIVER_MAX_SEGMENT_LENGTH = 40;

/*
#    # # ###### #    # #####   ####  #####  ##### 
#    # # #      #    # #    # #    # #    #   #   
#    # # #####  #    # #    # #    # #    #   #   
#    # # #      # ## # #####  #    # #####    #   
 #  #  # #      ##  ## #      #    # #   #    #   
  ##   # ###### #    # #       ####  #    #   # 
  */

export const VIEWPORT_START_RAD = Math.asin(
	1 - (CLOCK_RADIUS - GROUND_Y) / CLOCK_RADIUS
);
export const VIEWPORT_END_RAD = Math.PI - VIEWPORT_START_RAD;
export const VIEWPORT_WIDTH_RAD = VIEWPORT_END_RAD - VIEWPORT_START_RAD;

export const HOUR_STEP = VIEWPORT_WIDTH_RAD / 14;

/*
 ####  #    #   ##   #####   ####  #    #  ####  
#      #    #  #  #  #    # #    # #    # #      
 ####  ###### #    # #    # #    # #    #  ####  
     # #    # ###### #    # #    # # ## #      # 
#    # #    # #    # #    # #    # ##  ## #    # 
 ####  #    # #    # #####   ####  #    #  ####
 */

export const DROP_SHADOW_ID = "landscape-drop-shadow-filter";
export const DROP_SHADOW_X = "-50%";
export const DROP_SHADOW_Y = "-50%";
export const DROP_SHADOW_WIDTH = "200%";
export const DROP_SHADOW_HEIGHT = "200%";

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
export const calculateSunPosition = hours => {
	//calculate the sun's position
	const SUN_POS_RAD =
		VIEWPORT_START_RAD +
		HOUR_STEP + //add one because we don't want the sun directly on the horizon
		//because the clock isn't 0-12 we have to map the time to the interval 6-18 / 18-6
		((hours < 6 ? 6 + hours : hours - 6) % 12) * HOUR_STEP;

	return {
		x: CLOCK_X + CLOCK_RADIUS * Math.cos(Math.PI - SUN_POS_RAD),
		y: CLOCK_Y - CLOCK_RADIUS * Math.sin(Math.PI - SUN_POS_RAD)
	};
};

export const calculateSunPositionInAnimation = passed => {
	//calculate the sun's position
	let sunPosRad = 0;
	if (passed < SUN_ANIMATION_DURATION / 2) {
		sunPosRad =
			passed == 0
				? 0
				: VIEWPORT_START_RAD +
					13 * HOUR_STEP +
					4 * HOUR_STEP / SUN_ANIMATION_DURATION * passed;
	} else {
		sunPosRad =
			VIEWPORT_START_RAD -
			HOUR_STEP +
			4 *
				HOUR_STEP /
				SUN_ANIMATION_DURATION *
				(passed - SUN_ANIMATION_DURATION / 2);
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
export const isDay = hours => hours >= 6 && hours < 18;

/**
 * Generates a random y coordinate for a river segment
 * @returns {Number} The y coordinate
 */
const generateRandomRiverSegmentYCoordinate = () => {
	return (
		GROUND_Y +
		RIVER_WIDTH * 1.5 +
		Math.random() * (GROUND_HEIGHT - RIVER_WIDTH * 1.5)
	); //also add a little margin
};

/**
 * Generates random river coordinates
 * @returns {Array} An array containing objects with 'x' and 'y' values
 */
export const generateRiverCoordinates = () => {
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
			width =
				RIVER_MIN_SEGMENT_LENGTH +
				Math.random() * (SVG_WIDTH / RIVER_SEGMENTS / 2);
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
const rotatePoint = (
	{ x, y },
	angle = 0,
	{
		x: xOrigin,

		y: yOrigin
	}
) => {
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
			if (
				riverCoordinates[i].y < riverCoordinates[i + 1].y
					? y < riverCoordinates[i].y - RIVER_WIDTH ||
						y > riverCoordinates[i + 1].y + RIVER_WIDTH
					: y > riverCoordinates[i].y + RIVER_WIDTH ||
						y < riverCoordinates[i + 1].y - RIVER_WIDTH
			) {
				return false;
			}

			//for a real check we have to rotate this segment to align with the x axis
			//first we calculate the angle
			const angle = Math.atan(
				(riverCoordinates[i].y - riverCoordinates[i + 1].y) /
					(riverCoordinates[i].x - riverCoordinates[i + 1].x)
			);
			//now we have to rotate two points of the rectangle and the trunk coordinate back
			const coordinate = rotatePoint({ x, y }, -angle, { x: 0, y: 0 });
			const rectPoint1 = rotatePoint(
				{
					x: riverCoordinates[i].x,
					y: riverCoordinates[i].y
				},
				-angle,
				{ x: 0, y: 0 }
			);
			const rectPoint2 = rotatePoint(
				{
					x: riverCoordinates[i + 1].x,
					y: riverCoordinates[i + 1].y
				},
				-angle,
				{ x: 0, y: 0 }
			);

			//and now we can check whether the point is inside the rotated rectangle
			if (angle > 0) {
				//rectPoint2.y > rectPoint1.y
				return (
					coordinate.x >= rectPoint1.x - RIVER_WIDTH &&
					coordinate.x <= rectPoint2.x + RIVER_WIDTH &&
					coordinate.y >= rectPoint1.y - RIVER_WIDTH &&
					coordinate.y <= rectPoint2.y + RIVER_WIDTH
				);
			} else {
				return (
					coordinate.x >= rectPoint1.x - RIVER_WIDTH &&
					coordinate.x <= rectPoint2.x + RIVER_WIDTH &&
					coordinate.y <= rectPoint1.y + RIVER_WIDTH &&
					coordinate.y >= rectPoint2.y - RIVER_WIDTH
				);
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
export const generatePlantCoordinates = (count = 0, riverCoordinates = []) => {
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
