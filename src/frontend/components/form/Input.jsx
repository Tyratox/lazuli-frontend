import React from "react";
import styled from "styled-components";

import { colorPrimary } from "../../constants";

const Input = styled.input`
	padding: 0.5rem;
	width: 100%;
	border-radius: 3px;
	background-color: rgba(0, 0, 0, 0);
	border: ${colorPrimary} 1px solid;

	&::placeholder {
		font-family: "Oswald", sans-serif;
		line-height: 1.5;
	}
`;

export default Input;
