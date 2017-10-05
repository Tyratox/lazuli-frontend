import React from "react";
import PropTypes from "prop-types";
import ReactDOMServer from "react-dom/server";

import Router from "universal-router";

import Api from "./frontend/Api";
import routes from "./frontend/routes";

const router = new Router(routes);

const css = new Set(); // CSS for all rendered React components

class ContextProvider extends React.Component {
	getChildContext() {
		return {
			insertCss: (...styles) =>
				styles.forEach(style => css.add(style._getCss()))
		};
	}
	render() {
		return React.Children.only(this.props.children);
	}
}

ContextProvider.childContextTypes = {
	insertCss: PropTypes.func.isRequired
};

module.exports = request => {
	return router
		.resolve({ pathname: request.url })
		.then(({ title, component }) => {
			return Promise.resolve(
				ReactDOMServer.renderToString(
					<html>
						<head>
							<meta charSet="utf-8" />
							<meta name="keywords" content="" />
							<meta name="author" content="Tyratox" />
							<meta
								name="viewport"
								content="width=device-width, initial-scale=1.0"
							/>
							<style type="text/css">{[...css].join("")}</style>
							<title>{title}</title>
						</head>
						<body>
							<div id="root">
								<ContextProvider>{component}</ContextProvider>
							</div>
							<script src="/bundle.js" />
						</body>
					</html>
				)
			);
		})
		.catch(console.log);
};
