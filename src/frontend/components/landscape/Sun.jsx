import React from "react";

import { genUID } from "./helpers/utilities";
import { SUN_RADIUS, DROP_SHADOW_ID } from "./helpers/constants";

const GRADIENT_ID = genUID();
const SHADOW_ID = genUID();

const SHADOW_OFFSET_OUT = genUID();
const SHADOW_BLUR_OUT = genUID();

class Sun extends React.PureComponent {
	render = () => {
		const { x = 50, y = 45, day = true } = this.props;

		return (
			<g className="sun" filter={"url(#" + DROP_SHADOW_ID + ")"}>
				<defs>
					{day ? (
						<linearGradient
							x1="50%"
							y1="0%"
							x2="50%"
							y2="100%"
							id={GRADIENT_ID}
						>
							<stop stopColor="#FBDA61" offset="0%" />
							<stop stopColor="#F76B1C" offset="100%" />
						</linearGradient>
					) : (
						<linearGradient
							x1="50%"
							y1="0%"
							x2="50%"
							y2="100%"
							id={GRADIENT_ID}
						>
							<stop stopColor="#F2F1EF" offset="0%" />
							<stop stopColor="#DADFE1" offset="100%" />
						</linearGradient>
					)}

					<filter
						x="-5%"
						y="-5%"
						width="100%"
						height="100%"
						filterUnits="objectBoundingBox"
						id={SHADOW_ID}
					>
						<feOffset
							dx="0"
							dy="2"
							in="SourceAlpha"
							result={SHADOW_OFFSET_OUT}
						/>
						<feGaussianBlur
							stdDeviation="2"
							in={SHADOW_OFFSET_OUT}
							result={SHADOW_BLUR_OUT}
						/>
						<feColorMatrix
							values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0"
							type="matrix"
							in={SHADOW_BLUR_OUT}
						/>
					</filter>
				</defs>
				<circle
					cx={x}
					cy={y}
					r={SUN_RADIUS}
					fill={"url(#" + GRADIENT_ID + ")"}
				/>
			</g>
		);
	};
}

export default Sun;
