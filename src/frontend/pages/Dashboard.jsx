import React from "react";
import styled, { keyframes } from "styled-components";

import { colorPrimary, colorBackground } from "../constants.js";

import Sidebar from "../components/ui/Sidebar";
import ArcClock from "../components/ui/ArcClock";
import EarthMap from "../components/ui/EarthMap.jsx";

const Wrapper = styled.div`
	padding: 1rem;
	width: 100%;
	height: 100%;
	background-color: ${colorBackground};

	display: flex;
	flex-flow: row wrap;
	justify-content: space-around;
	align-items: flex-start;
	align-content: flex-start;
`;

const Card = styled.div`
	margin: 0.5rem;
	padding: 1rem;
	background-color: #fff;
	box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
	border-radius: 0.3rem;

	display: inline-block;
`;

const CenterTime = styled.div`
	position: relative;
	top: 50%;
	left: 0;
	right: 0;

	text-align: center;

	transform: translateY(-50%);
`;

const padd = t => (t < 10 ? "0" + t : t);

const Time = ({ date }) => {
	const hours = date.getHours(),
		minutes = date.getMinutes(),
		seconds = date.getSeconds();
	return (
		<CenterTime>
			{padd(hours) + ":" + padd(minutes) + ":" + padd(seconds)}
		</CenterTime>
	);
};

class Dashboard extends React.PureComponent {
	constructor() {
		super();
		this.state = { date: new Date() };
	}

	updateDate = () => {
		if (Date.now() - this.lastUpdate >= 1000 / 20) {
			this.setState({ date: new Date() });
			this.lastUpdate = Date.now();
		}

		this.animationFrame = requestAnimationFrame(this.updateDate);
	};

	componentDidMount = () => {
		this.lastUpdate = 0;
		this.animationFrame = requestAnimationFrame(this.updateDate);
	};

	componentWillUnmount = () => {
		if (this.timeInterval) {
			cancelAnimationFrame(this.animationFrame);
		}
	};

	render = () => {
		const { date } = this.state;

		const seconds = date.getSeconds() / 60 + date.getMilliseconds() / 60000;
		const minutes = date.getMinutes() / 60 + seconds / 60;
		const hours = date.getHours() / 24 + minutes / 60;

		return (
			<Wrapper>
				<Card>
					<ArcClock width={"200px"} progress={hours} innerWidth={0.9}>
						<ArcClock width={0.9} progress={minutes} innerWidth={0.6}>
							<ArcClock width={0.9} progress={seconds} innerWidth={0.8}>
								<Time date={date} />
							</ArcClock>
						</ArcClock>
					</ArcClock>
				</Card>
				<Card>
					<EarthMap />
				</Card>
			</Wrapper>
		);
	};
}

export default Dashboard;
