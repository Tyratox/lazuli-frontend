import React from "react";

import { genUID } from "./helpers/utilities";
import {
	SVG_WIDTH,
	SVG_HEIGHT,
	SKY_X,
	SKY_Y,
	calculateSkyGradient
} from "./helpers/constants.js";

const GRADIENT_ID = genUID();

class Sky extends React.PureComponent {
	render = () => {
		const { hours = 0, day = true, sunX = 50, sunY = 45 } = this.props;

		const gradient = calculateSkyGradient(hours, day);

		return (
			<g className="sky">
				<defs>
					{
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
									Object.values(gradient.from)
										.map(v => v.toString(16))
										.join("")
								}
								offset="0%"
							/>
							<stop
								stopColor={
									"#" +
									Object.values(gradient.to)
										.map(v => v.toString(16))
										.join("")
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
}

export default Sky;
