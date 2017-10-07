import React from "react";

import { genUID } from "./helpers/utilities";
import { RIVER_WIDTH, DROP_SHADOW_ID } from "./helpers/constants";

const GRADIENT_ID = genUID();

class River extends React.PureComponent {
	render = () => {
		const { coordinates } = this.props;
		return (
			<g className="river">
				<polyline
					id="Path-4"
					points={coordinates.map(obj => obj.x + " " + obj.y).join(" ")}
					stroke="#4990E2"
					fillOpacity="0"
					strokeWidth={RIVER_WIDTH}
				/>
			</g>
		);
	};
}

export default River;
