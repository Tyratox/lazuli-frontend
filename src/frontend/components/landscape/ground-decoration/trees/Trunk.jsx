import React from "react";

import { genUID } from "../../helpers/utilities";

const TRUNK_GRADIENT_ID = genUID();

class Trunk extends React.PureComponent {
	render = () => {
		const { x, y } = this.props;
		return (
			<g>
				<defs>
					<linearGradient
						x1="0%"
						y1="50%"
						x2="100%"
						y2="50%"
						id={TRUNK_GRADIENT_ID}
					>
						<stop stopColor="#C37850" offset="0%" />
						<stop stopColor="#F39C12" offset="100%" />
					</linearGradient>
				</defs>
				<rect
					fill={"url(#" + TRUNK_GRADIENT_ID + ")"}
					x={x}
					y={y}
					width="1"
					height="4"
				/>
			</g>
		);
	};
}

export default Trunk;
