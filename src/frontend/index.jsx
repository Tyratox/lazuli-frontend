import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import Router from "universal-router";
import history from "./history";

import environment from "./relay-environment";
import routes from "./routes";

const router = new Router(routes);

const render = (router, location) => {
	return router.resolve({ pathname: location.pathname }).then(result => {
		ReactDOM.render(
			<AppContainer>{result.component}</AppContainer>,
			document.getElementById("root"),
			() => {
				document.title = result.title;
			}
		);
	});
};

let unlisten = history.listen(render.bind(undefined, router));

//if the browser supports service workers, add one
if (navigator.serviceWorker) {
	navigator.serviceWorker.register("/service-worker.js", {
		scope: "/"
	});
}

//If hot reloading is enabled
if (module.hot) {
	module.hot.accept();
}

render(router, history.location);
