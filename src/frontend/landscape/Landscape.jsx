import React from "react";

import Clock from "./Clock";
import Ground from "./Ground";
import Sky from "./Sky";
import Sun from "./Sun";

import {
	SVG_WIDTH,
	SVG_HEIGHT,
	calculateSunPosition,
	isDay
} from "./constants.js";

class Landscape extends React.Component {
	constructor() {
		super();

		const d = new Date();
		this.state = { hours: d.getHours() + d.getMinutes() / 60 };
	}

	componentDidMount = () => {
		this.updateInterval = setInterval(() => {
			const d = new Date();
			this.setState({ hours: d.getHours() + d.getMinutes() / 60 });
		}, 60000);
		//this.setState({ hours: 1 });
	};

	componentWillUnmount = () => {
		if (this.updateInterval) {
			clearInterval(this.updateInterval);
		}
	};

	render() {
		const { hours } = this.state;

		const day = isDay(hours);

		const { x: SUN_X, y: SUN_Y } = calculateSunPosition(hours);

		return (
			<svg
				viewBox={"0 0 " + SVG_WIDTH + " " + SVG_HEIGHT}
				preserveAspectRatio="xMinYMin"
			>
				<Sky day={day} hours={this.state.hours} sunX={SUN_X} sunY={SUN_Y} />
				<Clock clockSift={day ? 19 : 31} day={day} />
				<Ground />
				<Sun x={SUN_X} y={SUN_Y} day={day} />
			</svg>
		);
	}
}

export default Landscape;
