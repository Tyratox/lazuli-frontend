import React from "react";

import { genUID } from "./helpers/utilities";
import {
	GROUND_X,
	GROUND_Y,
	GROUND_WIDTH,
	GROUND_HEIGHT,
	SVG_WIDTH,
	RIVER_WIDTH,
	generateRiverCoordinates,
	generatePlantCoordinates
} from "./helpers/constants";

import River from "./River";
import Plants from "./Plants";

const GRADIENT_ID = genUID();

class Ground extends React.PureComponent {
	render = () => {
		const {
			plantCount = 10,
			riverCoordinates = generateRiverCoordinates(),
			treeCoordinates: treeCoords
		} = this.props;

		let treeCoordinates = [];

		if (!treeCoords) {
			treeCoordinates = generatePlantCoordinates(riverCoordinates);
		}

		return (
			<g className="ground">
				<defs>
					<linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id={GRADIENT_ID}>
						<stop stopColor="#B4ED50" offset="0%" />
						<stop stopColor="#429321" offset="100%" />
					</linearGradient>
				</defs>
				<rect
					x={GROUND_X}
					y={GROUND_Y}
					width={GROUND_WIDTH}
					height={GROUND_HEIGHT}
					fill={"url(#" + GRADIENT_ID + ")"}
				/>
				<River coordinates={riverCoordinates} />
				<Plants coordinates={generatePlantCoordinates(plantCount)} />
			</g>
		);
	};
}

export default Ground;
