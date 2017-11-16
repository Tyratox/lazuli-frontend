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

import { API_URL } from "../../../server-config.json";

const Title = styled.h1`
	margin: 0;
	color: ${colorPrimary};
`;

const CenteredLogo = styled(LazuliLogo)`
	position: relative;
	top: 50%;
	transform: translateY(-50%);
`;

const Link = styled.a`
	text-decoration: none;
	color: ${colorPrimary};
`;

const RegistrationForm = styled.div`
	display: none;
	&:target {
		display: block;
	}
	&:target ~ #login {
		display: none;
	}
`;

class Login extends React.PureComponent {
	render = () => {
		return (
			<div>
				<Landscape />
				<Modal>
					<Flex>
						<Box width={1 / 4}>
							<CenteredLogo />
						</Box>
						<Box width={3 / 4} ml={"2rem"}>
							<RegistrationForm id="registration">
								<form action={API_URL + "/auth/register"} method="POST">
									<Title>LAZULI</Title>
									<Label>First name</Label>
									<Input type="text" name="nameFirst" placeholder="Nico" />
									<Label>E-Mail</Label>
									<Input
										type="email"
										name="email"
										placeholder="me@tyratox.ch"
									/>
									<Input name="locale" type="hidden" value="en-us" />
									<Button type="submit">Register</Button>
								</form>
								<Link href="#">Already registered?</Link>
							</RegistrationForm>
							<div id="login">
								<form action={API_URL + "/auth/login"} method="POST">
									<Title>LAZULI</Title>
									<Label>E-Mail</Label>
									<Input
										type="email"
										placeholder="me@tyratox.ch"
										name="email"
									/>
									<Label>Password</Label>
									<Input
										type="password"
										name="password"
										placeholder="•••••••••••••••"
									/>
									<Button type="submit">Login</Button>
								</form>
								<Link href="#registration">Not registered yet?</Link>
							</div>
						</Box>
					</Flex>
				</Modal>
			</div>
		);
	};
}

export default Login;
