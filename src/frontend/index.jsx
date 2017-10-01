import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import Router from "universal-router";
import createHistory from "history/createBrowserHistory";

import Api from "./Api";
import routes from "./routes";

const router = new Router(routes);
const history = createHistory();

const context = {
	api: Api.create({
		headers: accessToken ? { Authorization: "Bearer " + accessToken.token } : {}
	})
};

class ContextProvider extends React.Component {
	getChildContext() {
		return {
			insertCss: styles => styles._insertCss()
		};
	}
	render() {
		return React.Children.only(this.props.children);
	}
}

ContextProvider.childContextTypes = {
	insertCss: PropTypes.func.isRequired
};

const render = (router, location) => {
	return router
		.resolve({ pathname: location.pathname, ...context })
		.then(result => {
			ReactDOM.render(
				<AppContainer>
					<ContextProvider>{result.component}</ContextProvider>
				</AppContainer>,
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

let accessToken = localStorage.getItem("access-token");
if (accessToken) {
	accessToken = JSON.parse(accessToken);

	if (accessToken.expires < Date.now()) {
		//logout
		localStorage.setItem("access-token", "");
		accessToken = false;
	}
}

//If hot reloading is enabled
if (module.hot) {
	module.hot.accept("./routes", () => {
		const newRoutes = require("./routes").default;
		const newRouter = new Router(newRoutes);

		unlisten();
		unlisten = history.listen(render.bind(undefined, newRouter));

		render(history.location);
	});
}

render(router, history.location);
