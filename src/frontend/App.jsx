import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";

import styles from "./App.scss";

import Landscape from "./landscape/Landscape";

const App = ({ api }) => {
	return (
		<div>
			<Landscape />
		</div>
	);
};

export default withStyles(styles)(App);
