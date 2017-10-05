//define constants here because many of them depend on each other

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

/*
 ####  #    # #    # 
#      #    # ##   # 
 ####  #    # # #  # 
     # #    # #  # # 
#    # #    # #   ## 
 ####   ####  #    # 
 */

export const SUN_ANIMATION_DURATION = 1000;
export const SUN_ANIMATION_STEPS = 200;

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
					2 * HOUR_STEP / SUN_ANIMATION_DURATION * passed;
	} else {
		sunPosRad =
			passed == 0
				? 0
				: VIEWPORT_START_RAD +
					2 *
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
