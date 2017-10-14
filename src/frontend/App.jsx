import React from "react";
import styled from "styled-components";
import { Flex, Box } from "grid-styled";

import Landscape from "./components/landscape/Landscape";
import Modal from "./components/ui/Modal";

import LazuliLogo from "./components/brand/logo";

import { colorPrimary } from "./constants";

const Title = styled.h1`
	margin: 0;
	color: ${colorPrimary};
`;

const Input = styled.input`
	font-size: 1rem;
	padding: 0.5rem;
	width: 100%;
	border-radius: 3px;
	background-color: rgba(0, 0, 0, 0);
	border: ${colorPrimary} 1px solid;
`;

const FormLabel = styled.label`
	margin: 1rem 0 0.5rem 0;
	display: inline-block;
`;

const Logo = styled(LazuliLogo)`
	position: relative;
	top: 50%;
	transform: translateY(-50%);
`;

const App = ({ api }) => {
	return (
		<div>
			<Landscape />
			<Modal>
				<Flex>
					<Box width={1 / 4}>
						<Logo />
					</Box>
					<Box width={3 / 4} ml={"2rem"}>
						<Title>LAZULI</Title>
						<FormLabel>Username</FormLabel>
						<Input placeholder="Nico" />
						<FormLabel>Password</FormLabel>
						<Input placeholder="•••••••••••••••" type="password" />
					</Box>
				</Flex>
			</Modal>
		</div>
	);
};

export default App;
