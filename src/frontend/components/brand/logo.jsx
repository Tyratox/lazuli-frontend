import React from "react";

class Logo extends React.PureComponent {
	render = () => {
		return (
			<svg {...this.props} viewBox="0 0 219 308">
				<polygon
					fill="#DC6455"
					points="35 305 0 85 140 5.68434189e-14 215 155 190 305"
				/>
				<circle fill="#F5D76E" cx="111" cy="137" r="27" />
				<polygon fill="#F7CA18" points="0 85 115 135 190 305 35 305" />
				<polygon
					fillOpacity="0.5"
					fill="#F27935"
					points="140 0 115 135 35 305 190 305 215 155"
				/>
			</svg>
		);
	};
}

export default Logo;
