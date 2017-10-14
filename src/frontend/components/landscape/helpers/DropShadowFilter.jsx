import React from "react";

import { genUID } from "./utilities";

import {
	DROP_SHADOW_ID,
	DROP_SHADOW_X,
	DROP_SHADOW_Y,
	DROP_SHADOW_WIDTH,
	DROP_SHADOW_HEIGHT
} from "./constants";

const OFFSET_OUT = genUID();
const BLUR_OUT = genUID();
const MATRIX_OUT = genUID();

class DropShadowFilter extends React.PureComponent {
	render = () => {
		const { dx = 0.05, dy = 0.1, deviation = 0.05 } = this.props;
		return (
			<filter
				x={DROP_SHADOW_X}
				y={DROP_SHADOW_Y}
				width={DROP_SHADOW_WIDTH}
				height={DROP_SHADOW_HEIGHT}
				filterUnits="objectBoundingBox"
				id={DROP_SHADOW_ID}
			>
				<feOffset dx={dx} dy={dy} in="SourceGraphic" result={OFFSET_OUT} />
				<feGaussianBlur
					stdDeviation={deviation}
					in={OFFSET_OUT}
					result={BLUR_OUT}
				/>
				<feColorMatrix
					values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.4 0"
					type="matrix"
					in={BLUR_OUT}
					result={MATRIX_OUT}
				/>
				<feMerge>
					<feMergeNode in={MATRIX_OUT} />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>
		);
	};
}

export default DropShadowFilter;
