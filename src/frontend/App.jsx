import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";

import styles from "./App.scss";

import Landscape from "./landscape/Landscape";
import Modal from "./ui/Modal";

const App = ({ api }) => {
	return (
		<div>
			<Landscape />
			<Modal>
				<h1>Willkommen, Nico</h1>
				he
			</Modal>
		</div>
	);
};

export default withStyles(styles)(App);
