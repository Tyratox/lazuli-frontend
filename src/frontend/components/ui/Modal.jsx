import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
	0% {
		transform: translateX(-50%) translateY(100vh);
		opacity: 0;
	}
	100% {
		transform: translateX(-50%) translateY(0);
		opacity: 1;
	}
`;

const ModalWrapper = styled.div`
	position: fixed;
	top: 4rem;
	width: 30rem;
	left: 50%;

	padding: 2rem;
	background-color: rgba(255, 255, 255, 0.9);
	border-radius: 0.5rem;

	box-shadow: 1px 1px 0 2px rgba(0, 0, 0, 0.1);

	animation: ${fadeIn} 2.5s ease-in-out forwards;

	& > h1 {
		margin-top: 0;
	}
`;

class Modal extends React.PureComponent {
	render = () => {
		return <ModalWrapper>{this.props.children}</ModalWrapper>;
	};
}

export default Modal;
