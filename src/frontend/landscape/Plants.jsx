import React from "react";

import { genUID } from "./helpers/utilities";
import {
	SVG_WIDTH,
	GROUND_Y,
	GROUND_HEIGHT,
	RIVER_WIDTH,
	RIVER_SEGMENTS,
	RIVER_MIN_SEGMENT_LENGTH,
	RIVER_MAX_SEGMENT_LENGTH,
	DROP_SHADOW_ID
} from "./helpers/constants";

const LEAF_GRADIENT_ID = genUID();
const TRUNK_GRADIENT_ID = genUID();

class Trunk extends React.PureComponent {
	render = () => {
		const { x, y, width, height } = this.props;
		return (
			<rect
				fill={"url(#" + TRUNK_GRADIENT_ID + ")"}
				x={x}
				y={y}
				width={width}
				height={height}
			/>
		);
	};
}

class OvalTree extends React.PureComponent {
	render = () => {
		const { x, y } = this.props;
		//Everything in the g element is positioned relative to the current transformation matrix
		return (
			<g
				className="oval"
				transform={"translate(" + x + "," + y + ")"}
				filter={"url(#" + DROP_SHADOW_ID + ")"}
			>
				<Trunk x="0" y="-4" width="1" height="4" />

				<path
					d="M0.75,-2 C1.15,-2 2.35,-2.5 2.35,-4 C2.35,-6 1.35,-8 0.65,-8 C-0.15,-8 -1.25,-6 -1.25,-4 C-1.25,-2.5 -0.25,-2 0.75,-2 Z"
					fill={"url(#" + LEAF_GRADIENT_ID + ")"}
				/>
			</g>
		);
	};
}

class AngularTree extends React.PureComponent {
	render = () => {
		const { x, y } = this.props;
		//Everything in the g element is positioned relative to the current transformation matrix
		return (
			<g
				className="angular"
				transform={"translate(" + x + "," + y + ")"}
				filter={"url(#" + DROP_SHADOW_ID + ")"}
			>
				<Trunk x="0" y="-4" width="1" height="4" />
				<polygon
					fill={"url(#" + LEAF_GRADIENT_ID + ")"}
					points="-0.5 -2 1.5 -2 2.5 -4 0.5 -8 -1.5 -4"
				/>
			</g>
		);
	};
}

class Fir extends React.PureComponent {
	render = () => {
		const { x, y } = this.props;
		//Everything in the g element is positioned relative to the current transformation matrix
		return (
			<g
				className="fir"
				transform={"translate(" + x + "," + y + ")"}
				filter={"url(#" + DROP_SHADOW_ID + ")"}
			>
				<Trunk x="0" y="-4" width="1" height="4" />
				<polygon
					fill={"url(#" + LEAF_GRADIENT_ID + ")"}
					points="-1.5 -2.5 2.5 -2.5 1.5 -5 2.5 -5 0.5 -8 -1.5 -5 -0.5 -5"
				/>
			</g>
		);
	};
}

class Forest extends React.PureComponent {
	render = () => {
		const { coordinates, treeType = "mixed" } = this.props;

		return (
			<g className="forest">
				<defs>
					<linearGradient
						x1="0%"
						y1="50%"
						x2="100%"
						y2="50%"
						id={LEAF_GRADIENT_ID}
					>
						<stop stopColor="#8CBE50" offset="0%" />
						<stop stopColor="#78A050" offset="100%" />
					</linearGradient>
					<linearGradient
						x1="0%"
						y1="50%"
						x2="100%"
						y2="50%"
						id={TRUNK_GRADIENT_ID}
					>
						<stop stopColor="#C37850" offset="0%" />
						<stop stopColor="#F39C12" offset="100%" />
					</linearGradient>
				</defs>
				{coordinates
					.sort(({ y: y1 }, { y: y2 }) => {
						return y1 - y2;
					})
					.map(({ x, y }, index) => {
						let type = treeType;
						if (type === "mixed") {
							const rnd = Math.random();
							if (rnd < 1 / 3) {
								type = OvalTree;
							} else if (rnd < 2 / 3) {
								type = AngularTree;
							} else {
								type = Fir;
							}
						}

						return React.createElement(type, { key: index, x, y });
					})}
			</g>
		);
	};
}

export default Forest;
