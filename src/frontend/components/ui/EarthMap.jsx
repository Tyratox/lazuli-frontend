import React from "react";
import styled from "styled-components";

import {
	ComposableMap,
	ZoomableGroup,
	Geographies,
	Geography,
	Graticule,
	Annotation,
	Markers,
	Marker
} from "react-simple-maps";

import { colorPrimary, colorBackground } from "../../constants.js";

const Wrapper = styled.div`
	min-width: 300px;
	width: 50vw;
`;

class GraticuleMap extends React.PureComponent {
	constructor() {
		super();
		this.state = { zoom: 1, center: [0, 0], focused: false };
	}

	wheel = e => {
		e.preventDefault();
		this.setState({ zoom: Math.max(this.state.zoom - e.deltaY / 100, 1) });
	};

	keyUp = e => {
		if (e.keyCode === 27 && this.state.focused) {
			this.setState({ zoom: 1, center: [0, 0] });
		}
	};

	onMouseOver = () => {
		this.setState({ focused: true });
	};

	onMouseOut = () => {
		this.setState({ focused: false });
	};

	componentDidMount = () => {
		document.addEventListener("keyup", this.keyUp);
	};

	componentWillUnmount = () => {
		document.removeEventListener("keyup", this.keyUp);
	};

	render() {
		return (
			<Wrapper
				onWheel={this.wheel}
				onMouseOver={this.onMouseOver}
				onMouseOut={this.onMouseOut}
			>
				<ComposableMap
					projectionConfig={{
						scale: 205,
						rotation: [0, 0, 0]
					}}
					width={980}
					height={551}
					style={{
						width: "100%",
						height: "auto",
						backgroundColor: colorBackground
					}}
				>
					<ZoomableGroup
						zoom={this.state.zoom}
						disablePanning={true}
						center={this.state.center}
					>
						<Geographies geographyUrl="/assets/maps/world-50m.json">
							{(geographies, projection) =>
								geographies.map((geography, i) => (
									<Geography
										key={i}
										geography={geography}
										projection={projection}
										style={{
											default: {
												fill: colorPrimary,
												stroke: "#ffffff",
												strokeWidth: 0.75,
												outline: "none"
											},
											hover: {
												fill: "#ffffff",
												stroke: colorPrimary,
												strokeWidth: 0.75,
												outline: "none"
											},
											pressed: {
												fill: "#ffffff",
												stroke: colorPrimary,
												strokeWidth: 0.75,
												outline: "none"
											}
										}}
									/>
								))}
						</Geographies>
						<Graticule stroke="#dddddd" step={[20, 20]} />
						<Annotation
							dx={-60}
							dy={-30}
							subject={[8.015, 47.408]}
							strokeWidth={1}
						>
							<text>{"server.tyratox.ch"}</text>
						</Annotation>
						<Markers>
							<Marker
								marker={{ coordinates: [8.015, 47.408] }}
								style={{
									default: { fill: "#000" },
									hover: { fill: "#999" },
									pressed: { fill: "#000" }
								}}
								onClick={() => {
									this.setState({ zoom: 6, center: [8.015, 47.408] });
								}}
							>
								<circle cx={0} cy={0} r={4} />
							</Marker>
						</Markers>
					</ZoomableGroup>
				</ComposableMap>
			</Wrapper>
		);
	}
}

export default GraticuleMap;
