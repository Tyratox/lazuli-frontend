import React from "react";

import Clock from "./Clock";
import Ground from "./Ground";
import Sky from "./Sky";
import Sun from "./Sun";
import Hills from "./background/Hills";

import DropShadowFilter from "./helpers/DropShadowFilter";

import {
	SVG_WIDTH,
	SVG_HEIGHT,
	ANIMATION_FPS_CAP,
	SUN_ANIMATION_DURATION,
	calculateSunPosition,
	calculateSunPositionInAnimation,
	isDay
} from "./helpers/constants.js";

class Landscape extends React.PureComponent {
	constructor() {
		super();

		const d = new Date();
		this.state = {
			hours: d.getHours() + d.getMinutes() / 60 + d.getSeconds() / 3600
		};
	}

	animateSun = () => {
		const now = Date.now();
		let last = this.lastMovedClouds;
		const passed = now - last;

		if (!last) {
			last = this.lastMovedClouds = Date.now();
		}

		if (passed > 1 / ANIMATION_FPS_CAP * 1000) {
			const { x, y } = calculateSunPositionInAnimation(
				this.totalAnimationTimePassed
			);
			this.setState({ overrideSunX: x, overrideSunY: y });

			this.lastMovedClouds = now;
			this.totalAnimationTimePassed += passed;

			if (this.totalAnimationTimePassed >= SUN_ANIMATION_DURATION) {
				this.animate = false;
			}
		}

		if (this.animate) {
			this.animationFrameId = window.requestAnimationFrame(this.animateSun);
		} else {
			this.setState({ overrideSunX: undefined, overrideSunY: undefined });
		}
	};

	componentDidMount = () => {
		/*this.updateInterval = setInterval(() => {
			const d = new Date();
			this.setState({ hours: d.getHours() + d.getMinutes() / 60 + d.getSeconds() / 3600 });
		}, 30000);*/
		this.updateInterval = setInterval(() => {
			const d = new Date();
			let hours = d.getHours() + d.getMinutes() / 60 + d.getSeconds() / 3600;

			if (
				(this.state.hours < 6 && hours >= 6 && hours < 7) ||
				(this.state.hours < 18 && hours >= 18 && hours < 19)
			) {
				this.animate = true;
				this.totalAnimationTimePassed = 0;
				this.animationFrameId = window.requestAnimationFrame(this.animateSun);
			}

			this.setState({ hours });
		}, 100);
	};

	componentWillUnmount = () => {
		this.animate = false;

		if (this.animationFrameId) {
			window.cancelAnimationFrame(this.animationFrameId);
		}
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
				<defs>
					<DropShadowFilter />
				</defs>
				<Sky day={day} hours={this.state.hours} sunX={SUN_X} sunY={SUN_Y} />
				<Clock clockSift={day ? 19 : 31} day={day} />
				<Sun
					x={overrideSunX ? overrideSunX : SUN_X}
					y={overrideSunY ? overrideSunY : SUN_Y}
					day={day}
				/>
				<Hills />
				<Ground />
			</svg>
		);
	}
}

export default Landscape;
