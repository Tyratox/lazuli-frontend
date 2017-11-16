import React from "react";
import styled, { keyframes } from "styled-components";

import Search from "./Search";

import { colorPrimary } from "../../constants";

const Title = styled.h1`
	color: ${colorPrimary};
	padding: 1rem;
	margin: 0;
	font-weight: 400;
	text-align: center;
	border-bottom: ${colorPrimary} 1px solid;
`;

const Wrapper = styled.div`
	height: 100vh;
	background-color: rgba(255, 255, 255, 0.9);
`;

class Sidebar extends React.PureComponent {
	constructor() {
		super();
		this.state = { search: false };
	}
	onKeydown = e => {
		if (e.keyCode === 32 && e.ctrlKey) {
			this.setState({ search: !this.state.search });
		} else if (e.keyCode === 27 && this.state.search) {
			this.setState({ search: false });
		}
	};
	componentDidMount = () => {
		document.addEventListener("keydown", this.onKeydown);
	};
	componentWillUnmount = () => {
		document.removeEventListener("keydown", this.onKeydown);
	};
	render = () => {
		return (
			<div>
				<Wrapper>
					<Title>LAZULI</Title>
				</Wrapper>
				{this.state.search && <Search />}
			</div>
		);
	};
}

export default Sidebar;
