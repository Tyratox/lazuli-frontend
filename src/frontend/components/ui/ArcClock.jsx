import React from "react";
import styled, { keyframes } from "styled-components";

import { colorPrimary, colorBackground } from "../../constants.js";

const Circle = styled.div`
	width: 100%;
	border-radius: 50%;

	&:after {
		content: "";
		display: block;
		padding-bottom: 100%;
	}
`;

const ClockCircleEmpty = Circle.extend`
	position: relative;
	overflow: hidden;
	clip-path: circle(100% at 50% 50%);
	background-color: ${colorBackground};
`;
const ClockCircleColor = styled.div`
	position: absolute;
	left: 0;

	height: 100%;
	width: 50%;
	background-color: ${colorPrimary};

	transform-origin: 100% 50%;
`;
const ClockCircleColorMask = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 50%;
	height: 100%;
	background-color: ${colorBackground};
`;
const ClockCircleColorFiller = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	width: 50%;
	height: 100%;

	background-color: ${colorPrimary};
`;

const ClockCircleCover = Circle.extend`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);

	width: ${props => props.width * 100 + "%"};
	background-color: #fff;

	box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);
`;

const ClockCircleCoverContent = styled.div`
	position: absolute;

	width: 100%;
	height: 100%;
`;

const ClockWrapper = styled.div`
	position: relative;
	width: ${props =>
		isNaN(props.width) ? props.width : props.width * 100 + "%"};
	top: ${props =>
		(isNaN(props.width) ? "auto" : (1 - props.width) / 2) * 100 + "%"};
	left: ${props =>
		(isNaN(props.width) ? "auto" : (1 - props.width) / 2) * 100 + "%"};
`;

class ClockCircle extends React.PureComponent {
	render = () => {
		const { children, progress = 0, width, innerWidth } = this.props;

		return (
			<ClockWrapper width={width}>
				{/* first border */}
				<ClockCircleEmpty>
					{/* the spinner */}
					<ClockCircleColor
						style={{
							transform: `rotate(${progress * 360 + "deg"})`
						}}
					/>
					{/* a mask covering the left half of the circle for the first 50% */}
					<ClockCircleColorMask
						style={{ opacity: progress < 0.5 ? "1" : "0" }}
					/>
					{/* a filler filling the right half for the last 50% */}
					<ClockCircleColorFiller
						style={{ opacity: progress > 0.5 ? "1" : "0" }}
					/>
					{/* covers the whole circle */}
					<ClockCircleCover width={innerWidth}>
						<ClockCircleCoverContent>{children}</ClockCircleCoverContent>
					</ClockCircleCover>
				</ClockCircleEmpty>
			</ClockWrapper>
		);
	};
}

export default ClockCircle;
