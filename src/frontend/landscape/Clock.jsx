import React from "react";

import { genUID } from "../utilities";
import {
	CLOCK_X,
	CLOCK_Y,
	CLOCK_RADIUS,
	CLOCK_LINE_LENGTH_INSIDE,
	CLOCK_LINE_LENGTH_OUTSIDE,
	CLOCK_DISTANCE_TO_LABEL,
	VIEWPORT_START_RAD,
	VIEWPORT_END_RAD,
	HOUR_STEP
} from "./constants.js";

const caluclateScaledCircleCoordinate = (
	{ x: centerX, y: centerY },
	radius,
	offset
) => {
	return {
		x: centerX + radius * Math.cos(offset),
		y: centerY - radius * Math.sin(offset)
	};
};

const calculateCoordinateOffsetByDistance = (slope = false, distance) => {
	const dx = slope
		? Math.sqrt(Math.pow(distance, 2) / (Math.pow(slope, 2) + 1))
		: 0;

	return {
		dx,
		dy: slope ? slope * dx : distance
	};
};

const toHour = n => Math.abs(n) % 24;

const Clock = ({ clockSift = 19, day = true }) => {
	const opacity = day ? "0.2" : "0.1";

	return (
		<g>
			<circle
				cx={CLOCK_X}
				cy={CLOCK_Y}
				r={CLOCK_RADIUS}
				stroke="#fff"
				strokeWidth="0.05"
				fillOpacity="0"
				strokeOpacity={opacity}
			/>

			{[...Array(14)].map((e, i) => {
				if (i === 0) {
					return null;
				}

				const radOffset = VIEWPORT_START_RAD + HOUR_STEP * i;
				//calc the coordinates on the circle
				const { x: refX, y: refY } = caluclateScaledCircleCoordinate(
					{ x: CLOCK_X, y: CLOCK_Y },
					CLOCK_RADIUS,
					radOffset
				);

				//then caluclate the slope
				const slope =
					refX === CLOCK_X ? false : (refY - CLOCK_Y) / (refX - CLOCK_X);

				//then use pythagorean theorem
				let { dx, dy } = calculateCoordinateOffsetByDistance(
					slope,
					CLOCK_LINE_LENGTH_OUTSIDE
				);
				let { dx: dx2, dy: dy2 } = calculateCoordinateOffsetByDistance(
					slope,
					CLOCK_LINE_LENGTH_INSIDE
				);
				let { dx: dxText, dy: dyText } = calculateCoordinateOffsetByDistance(
					slope,
					CLOCK_DISTANCE_TO_LABEL
				);

				if (i >= 7) {
					dx *= -1;
					dy *= -1;

					dx2 *= -1;
					dy2 *= -1;

					dxText *= -1;
					dyText *= -1;
				}

				return (
					<g key={i}>
						<line
							key={i}
							x1={refX + dx}
							y1={refY + dy}
							x2={refX - dx2}
							y2={refY - dy2}
							stroke="#fff"
							strokeWidth="0.05"
							strokeOpacity={opacity}
						/>
						<text
							x={refX - dxText}
							y={refY - dyText}
							fill="#fff"
							fontSize="1.25"
							fontFamily="sans-serif"
							transform={
								"rotate(" +
								(90 - radOffset * (180 / Math.PI)) +
								", " +
								(refX - dxText) +
								"," +
								(refY - dyText) +
								")"
							}
							textAnchor="middle"
							dominantBaseline="central"
							fillOpacity={opacity}
						>
							{toHour(clockSift - i) + ":00"}
						</text>
					</g>
				);
			})}
		</g>
	);
};

export default Clock;
