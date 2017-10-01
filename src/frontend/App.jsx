import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";

import styles from "./App.scss";

const App = ({ api }) => {
	return <span styleName="class">hello world</span>;
};

export default withStyles(styles)(App);
