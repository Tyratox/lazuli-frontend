import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import App from "./App.jsx";

//if the browser supports service workers, add one
if (navigator.serviceWorker) {
	navigator.serviceWorker.register("/service-worker.js", {
		scope: "/"
	});
}

ReactDOM.render(
	<AppContainer>
		<App />
	</AppContainer>,
	document.getElementById("root")
);

if (module.hot) {
	module.hot.accept("App.jsx", () => {
		const NextApp = require("App.jsx").default;

		ReactDOM.render(
			<AppContainer>
				<NextApp />
			</AppContainer>,
			document.getElementById("root")
		);
	});
}
