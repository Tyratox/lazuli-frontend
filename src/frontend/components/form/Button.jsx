import React from "react";
import styled from "styled-components";

import { colorPrimary } from "../../constants";

const Button = styled.input`
	font-size: 1rem;
	margin-top: 1rem;
	padding: 0.5rem 1rem;
	border-radius: 3px;
	background-color: ${colorPrimary};
	color: #fff;
	cursor: pointer;
	border: none;
`;

export default Button;
