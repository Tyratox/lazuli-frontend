import React from "react";

import { genUID } from "../../helpers/utilities";
import { DROP_SHADOW_ID } from "../../helpers/constants";

import Trunk from "./Trunk";

const LEAF_GRADIENT_ID = genUID();

class OvalTree extends React.PureComponent {
	render = () => {
		const { x, y } = this.props;
		return (
			<g
				className="oval"
				transform={"translate(" + x + "," + y + ")"}
				filter={"url(#" + DROP_SHADOW_ID + ")"}
			>
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
				</defs>
				<Trunk x="0" y="-4" width="1" height="4" />

				<path
					d="M0.75,-2 C1.15,-2 2.35,-2.5 2.35,-4 C2.35,-6 1.35,-8 0.65,-8 C-0.15,-8 -1.25,-6 -1.25,-4 C-1.25,-2.5 -0.25,-2 0.75,-2 Z"
					fill={"url(#" + LEAF_GRADIENT_ID + ")"}
				/>
			</g>
		);
	};
}

export default OvalTree;
