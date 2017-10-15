import React from "react";
import styled from "styled-components";
import { Flex, Box } from "grid-styled";

import Landscape from "../components/landscape/Landscape";
import Modal from "../components/ui/Modal";

import Input from "../components/form/Input";
import Label from "../components/form/Label";
import Button from "../components/form/Button";

import LazuliLogo from "../components/brand/logo";

import { colorPrimary } from "../constants";
import history from "../history";

const Title = styled.h1`
	margin: 0;
	color: ${colorPrimary};
`;

const CenteredLogo = styled(LazuliLogo)`
	position: relative;
	top: 50%;
	transform: translateY(-50%);
`;

const Login = () => {
	return (
		<div>
			<Landscape />
			<Modal>
				<Flex>
					<Box width={1 / 4}>
						<CenteredLogo />
					</Box>
					<Box width={3 / 4} ml={"2rem"}>
						<form
							action="https://x.y/"
							method="POST"
							onSubmit={e => {
								e.preventDefault();
								e.stopPropagation();
								history.push("/dashboard");
							}}
						>
							<Title>LAZULI</Title>
							<Label>Username</Label>
							<Input placeholder="Nico" />
							<Label>Password</Label>
							<Input placeholder="•••••••••••••••" type="password" />
							<Button type="submit" value="Login" />
						</form>
					</Box>
				</Flex>
			</Modal>
		</div>
	);
};

export default Login;
