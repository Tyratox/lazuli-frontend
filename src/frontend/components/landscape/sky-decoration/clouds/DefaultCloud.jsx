import React from "react";

import { genUID } from "../../helpers/utilities";
import { SVG_WIDTH, GROUND_Y, DROP_SHADOW_ID } from "../../helpers/constants";

class Cloud extends React.PureComponent {
	render = () => {
		const { x, y } = this.props;

		return (
			<g
				className="cloud"
				filter={"url(#" + DROP_SHADOW_ID + ")"}
				transform={"translate(" + x + "," + y + ")"}
			>
				<path
					d="M12,3 C12,1.5 11,0.6 9.8,0.65 C9.5,0.65 9.3,0.7 9,0.8 C8.5,0.3 7.9,0 7,0 C6.2,0 5.4,0.5 5,1.2 C4.5,0.8 4,0.7 3.5,0.7 C3,0.7 2.4,0.9 2,1.3 C1.9,1.3 1.7,1.2 1.6,1.2 C0.6,1.2 0,2 0,3 L12,3 Z"
					fill="#FFFFFF"
				/>
			</g>
		);
	};
}

export default Cloud;
