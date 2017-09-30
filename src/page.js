import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "./frontend/App.jsx";

module.exports = request => {
	const html = ReactDOMServer.renderToString(<App url={request.url} />);

	return ReactDOMServer.renderToString(
		<html>
			<head>
				<meta charSet="utf-8" />
				<meta name="keywords" content="" />
				<meta name="author" content="Tyratox" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Title</title>
			</head>
			<body>
				<div id="root" dangerouslySetInnerHTML={{ __html: html }} />
				<script src="/bundle.js" />
			</body>
		</html>
	);
};
