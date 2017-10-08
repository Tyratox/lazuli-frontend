import React from "react";

import { genUID } from "./helpers/utilities";
import {
	SVG_WIDTH,
	GROUND_Y,
	GROUND_HEIGHT,
	RIVER_WIDTH,
	RIVER_SEGMENTS,
	RIVER_MIN_SEGMENT_LENGTH,
	RIVER_MAX_SEGMENT_LENGTH
} from "./helpers/constants";

import AngularTree from "./ground-decoration/trees/Angular";
import Fir from "./ground-decoration/trees/Fir";
import OvalTree from "./ground-decoration/trees/Oval";

class GroundDecoration extends React.PureComponent {
	render = () => {
		const { coordinates, treeType = "mixed" } = this.props;

		return (
			<g className="forest">
				<defs />
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

export default GroundDecoration;
