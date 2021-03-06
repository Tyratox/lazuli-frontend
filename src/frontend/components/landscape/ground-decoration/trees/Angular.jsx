import React from "react";

import { genUID } from "../../helpers/utilities";
import { DROP_SHADOW_ID } from "../../helpers/constants";

import Trunk from "./Trunk";

const LEAF_GRADIENT_ID = genUID();

class AngularTree extends React.PureComponent {
	render = () => {
		const { x, y } = this.props;
		return (
			<g
				className="angular"
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
				<polygon
					fill={"url(#" + LEAF_GRADIENT_ID + ")"}
					points="-0.5 -2 1.5 -2 2.5 -4 0.5 -8 -1.5 -4"
				/>
			</g>
		);
	};
}

export default AngularTree;
