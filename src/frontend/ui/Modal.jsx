import React from "react";
import withStyles from "isomorphic-style-loader/lib/withStyles";

import styles from "./Modal.scss";

class Modal extends React.PureComponent {
	render = () => {
		return <div styleName="modal">{this.props.children}</div>;
	};
}

export default withStyles(styles)(Modal);
