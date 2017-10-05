import React from "react";

import { genUID } from "../utilities";

const GRADIENT_ID = genUID();

const Ground = ({ x = 0, y = 25, width = 100, height = 25 }) => {
	return (
		<g>
			<defs>
				<linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id={GRADIENT_ID}>
					<stop stopColor="#B4ED50" offset="0%" />
					<stop stopColor="#429321" offset="100%" />
				</linearGradient>
			</defs>
			<rect
				x={x}
				y={y}
				width={width}
				height={height}
				fill={"url(#" + GRADIENT_ID + ")"}
			/>
		</g>
	);
};

export default Ground;
