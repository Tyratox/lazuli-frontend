import React from "react";

import Clock from "./Clock";
import Ground from "./Ground";
import Sky from "./Sky";
import Sun from "./Sun";

import {
	SVG_WIDTH,
	SVG_HEIGHT,
	SUN_ANIMATION_DURATION,
	SUN_ANIMATION_STEPS,
	calculateSunPosition,
	calculateSunPositionInAnimation,
	isDay
} from "./constants.js";

class Landscape extends React.Component {
	constructor() {
		super();

		const d = new Date();
		this.state = { hours: d.getHours() + d.getMinutes() / 60 };
	}

	animateSun = (passed = 0) => {
		if (passed >= SUN_ANIMATION_DURATION) {
			clearTimeout(this.morning);
			this.setState({ overrideSunX: undefined, overrideSunY: undefined });
			return;
		}
		const { x, y } = calculateSunPositionInAnimation(passed);
		this.setState({ overrideSunX: x, overrideSunY: y });

		this.morning = setTimeout(() => {
			this.animateSun(passed + SUN_ANIMATION_DURATION / SUN_ANIMATION_STEPS);
		}, SUN_ANIMATION_DURATION / SUN_ANIMATION_STEPS);
	};

	componentDidMount = () => {
		/*this.updateInterval = setInterval(() => {
			const d = new Date();
			this.setState({ hours: d.getHours() + d.getMinutes() / 60 });
		}, 60000);*/
		this.updateInterval = setInterval(() => {
			const d = new Date();
			let hours = d.getMinutes() % 24 + d.getSeconds() / 60 + 8.5;
			if (
				(this.state.hours < 6 && hours >= 6) ||
				(this.state.hours < 18 && hours >= 18)
			) {
				this.animateSun();
			}
			this.setState({ hours });
		}, 1000);
	};

	componentWillUnmount = () => {
		if (this.updateInterval) {
			clearInterval(this.updateInterval);
		}
	};

	render() {
		const { hours, overrideSunX, overrideSunY } = this.state;

		const day = isDay(hours);

		const { x: SUN_X, y: SUN_Y } = calculateSunPosition(hours);

		return (
			<svg
				viewBox={"0 0 " + SVG_WIDTH + " " + SVG_HEIGHT}
				preserveAspectRatio="xMinYMin"
			>
				<Sky day={day} hours={this.state.hours} sunX={SUN_X} sunY={SUN_Y} />
				<Clock clockSift={day ? 19 : 31} day={day} />
				<Sun
					x={overrideSunX ? overrideSunX : SUN_X}
					y={overrideSunY ? overrideSunY : SUN_Y}
					day={day}
				/>
				<Ground />
			</svg>
		);
	}
}

export default Landscape;
