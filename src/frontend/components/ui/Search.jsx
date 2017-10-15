import React from "react";
import styled from "styled-components";

import { colorPrimary } from "../../constants";

import Input from "../form/Input";

const Wrapper = styled.div`
	position: fixed;
	top: 20vh;
	width: 500px;
	max-width: 100%;

	border: ${colorPrimary} 1px solid;
	border-radius: 2px;

	left: 50%;
	transform: translateX(-50%);

	background-color: #fff;
	box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.15);
`;

const SearchInput = Input.extend`
	font-size: 1.75rem;
	padding: 0.5rem 1rem;
	border-radius: 0;
	border: none;
	outline: none;
	color: ${colorPrimary};
`;

class Search extends React.PureComponent {
	render = () => {
		return (
			<Wrapper>
				<SearchInput placeholder={"Search"} autoFocus />
			</Wrapper>
		);
	};
}

export default Search;
