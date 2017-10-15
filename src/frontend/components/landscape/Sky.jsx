import React from "react";

import { genUID } from "./helpers/utilities";
import {
	SVG_WIDTH,
	SVG_HEIGHT,
	ANIMATION_FPS_CAP,
	SKY_X,
	SKY_Y,
	SKY_WIDTH,
	SKY_HEIGHT,
	MIN_WIND_STRENGTH,
	MAX_WIND_STRENGTH,
	SKY_CLOUD_COUNT,
	CLOUD_MOVE_INTERVAL,
	calculateSkyGradient
} from "./helpers/constants.js";

import Cloud from "./sky-decoration/clouds/DefaultCloud";

const GRADIENT_ID = genUID();

const CLOUD_DESPAWN_MARGIN_LEFT = 15;

class Sky extends React.PureComponent {
	constructor() {
		super();
		this.state = { clouds: [] };
	}
	checkClouds = () => {
		let { clouds } = this.state;

		clouds = clouds.filter(
			({ x }) => x > -CLOUD_DESPAWN_MARGIN_LEFT && x < SVG_WIDTH
		);

		if (clouds.length < SKY_CLOUD_COUNT) {
			//spawn new ones
			for (let i = 0; i < SKY_CLOUD_COUNT - clouds.length; i++) {
				const left = Math.random() < 0.5;

				clouds.push({
					x: left ? -CLOUD_DESPAWN_MARGIN_LEFT : SVG_WIDTH,
					y: Math.random() * (SKY_HEIGHT / 2),
					windStrength:
						(left ? 1 : -1) *
						(MIN_WIND_STRENGTH +
							Math.random() * (MAX_WIND_STRENGTH - MIN_WIND_STRENGTH))
				});
			}
		}

		this.setState({ clouds });
	};
	moveClouds = () => {
		const now = Date.now();
		let last = this.lastMovedClouds;
		const passed = now - last;

		if (!last) {
			last = this.lastMovedClouds = Date.now();
		}

		if (passed > 1 / ANIMATION_FPS_CAP * 1000) {
			let { clouds } = this.state;

			clouds = clouds.map(cloud => {
				return { ...cloud, x: cloud.x + cloud.windStrength * passed / 1000 };
			});

			this.setState({ clouds }, this.checkClouds);
			this.lastMovedClouds = now;
		}

		if (this.animate) {
			this.animationFrameId = window.requestAnimationFrame(this.moveClouds);
		}
	};
	componentDidMount = () => {
		this.animate = true;
		this.animationFrameId = window.requestAnimationFrame(this.moveClouds);
	};

	componentWillUnmount = () => {
		this.animate = false;

		if (this.animationFrameId) {
			window.cancelAnimationFrame(this.animationFrameId);
		}
	};
	render = () => {
		const { hours = 0, day = true, sunX = 50, sunY = 45 } = this.props;
		const { clouds } = this.state;

		const gradient = calculateSkyGradient(hours, day);

		return (
			<g className="sky">
				<defs>
					{
						<linearGradient
							x1={100 * sunX / SVG_WIDTH + "%"}
							y1="0%"
							x2="50%"
							y2="100%"
							id={GRADIENT_ID}
						>
							<stop
								stopColor={
									"#" +
									Object.values(gradient.from)
										.map(v => v.toString(16))
										.join("")
								}
								offset="0%"
							/>
							<stop
								stopColor={
									"#" +
									Object.values(gradient.to)
										.map(v => v.toString(16))
										.join("")
								}
								offset="100%"
							/>
						</linearGradient>
					}
				</defs>
				<rect
					x={SKY_X}
					y={SKY_Y}
					width={SVG_WIDTH}
					height={SKY_HEIGHT}
					fill={"url(#" + GRADIENT_ID + ")"}
				/>
				{clouds.map(({ x, y }, i) => {
					return <Cloud key={i} x={x} y={y} />;
				})}
			</g>
		);
	};
}

export default Sky;
