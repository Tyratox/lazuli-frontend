import React from "react";
import ReactDOMServer from "react-dom/server";
import { ServerStyleSheet } from "styled-components";

import Router from "universal-router";

import Api from "./frontend/Api";
import routes from "./frontend/routes";

const router = new Router(routes);

module.exports = request => {
	return router
		.resolve({ pathname: request.url })
		.then(({ title, component }) => {
			const sheet = new ServerStyleSheet();

			sheet.collectStyles(component);

			const styles = sheet.getStyleTags();

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
							<link href="/assets/styles/fonts.css" rel="stylesheet" />
							<link href="/assets/styles/normalize.css" rel="stylesheet" />

							{/* kinda hacky */}
							<meta name="css-placeholder" />
							<title>{title}</title>
						</head>
						<body>
							<div id="root">{component}</div>
							<script src="/bundle.js" />
						</body>
					</html>
				).replace('<meta name="css-placeholder"/>', styles)
			);
		})
		.catch(console.log);
};
