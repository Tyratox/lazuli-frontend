import React from "react";

import { genUID } from "../helpers/utilities";
import { GROUND_Y, DROP_SHADOW_ID } from "../helpers/constants";

const HILLS_GRADIENT_ID = genUID();

class Hills extends React.PureComponent {
	render = () => {
		return (
			<g className="hills" filter={"url(#" + DROP_SHADOW_ID + ")"}>
				<defs>
					<linearGradient
						x1="0%"
						y1="50%"
						x2="100%"
						y2="50%"
						id={HILLS_GRADIENT_ID}
					>
						<stop stopColor="#1E824C" offset="0%" />
						<stop stopColor="#26A65B" offset="100%" />
					</linearGradient>
				</defs>
				<ellipse
					cx="15"
					cy={GROUND_Y + 10}
					rx="20"
					ry="15"
					fill={"url(#" + HILLS_GRADIENT_ID + ")"}
				/>
				<ellipse
					cx="85"
					cy={GROUND_Y + 10}
					rx="20"
					ry="15"
					fill={"url(#" + HILLS_GRADIENT_ID + ")"}
				/>
				<ellipse
					cx="50"
					cy={GROUND_Y + 10}
					rx="30"
					ry="20"
					fill={"url(#" + HILLS_GRADIENT_ID + ")"}
				/>
			</g>
		);
	};
}

export default Hills;
