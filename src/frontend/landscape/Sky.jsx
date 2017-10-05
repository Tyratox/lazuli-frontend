import React from "react";

import { genUID } from "../utilities";
import { SVG_WIDTH, SVG_HEIGHT, SKY_X, SKY_Y } from "./constants.js";

const GRADIENT_ID = genUID();

const STOPS = {
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

const Sky = ({ hours = 0, day = true, sunX = 50, sunY = 45 }) => {
	const stops = day ? STOPS.day : STOPS.night;
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

	return (
		<g>
			<defs>
				{
					/*day ? (
					hours < 8 ? (
						<linearGradient
							x1={Math.pow(sunX, 7) / 10e5 / SVG_WIDTH + "%"}
							y1={0}
							x2="100%"
							y2="50%"
							id={GRADIENT_ID}
						>
							<stop stopColor="#F9BF3B" offset="0%" />
							<stop stopColor="#2C3E50" offset="100%" />
						</linearGradient>
					) : (
						<linearGradient
							x1="50%"
							y1="0%"
							x2="50%"
							y2="100%"
							id={GRADIENT_ID}
						>
							<stop stopColor="#89C4F4" offset="0%" />
							<stop stopColor="#22A7F0" offset="100%" />
						</linearGradient>
					)
				) : (
					<linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id={GRADIENT_ID}>
						<stop stopColor="#2C3E50" offset="0%" />
						<stop stopColor="#34495E" offset="100%" />
					</linearGradient>
				)*/
					<linearGradient
						x1={100 * sunX / SVG_WIDTH + "%"}
						y1="0%"
						x2="50%"
						y2="100%"
						id={GRADIENT_ID}
					>
						<stop
							stopColor={
								"#" +
								gradient.from.r.toString(16) +
								gradient.from.g.toString(16) +
								gradient.from.b.toString(16)
							}
							offset="0%"
						/>
						<stop
							stopColor={
								"#" +
								gradient.to.r.toString(16) +
								gradient.to.g.toString(16) +
								gradient.to.b.toString(16)
							}
							offset="100%"
						/>
					</linearGradient>
				}
			</defs>
			<rect
				x={SKY_X}
				y={SKY_Y}
				width={SVG_WIDTH}
				height={SVG_HEIGHT}
				fill={"url(#" + GRADIENT_ID + ")"}
			/>
		</g>
	);
};

export default Sky;
