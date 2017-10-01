const http2 = require("spdy");
const express = require("express");
const compression = require("compression");
const promiseRequest = require("request-promise-native");

const path = require("path");
const fs = require("fs");

const {
	KEY_PATH,
	CERT_PATH,
	HTTP_PORT,
	API_URL,
	CLIENT_ID,
	CLIENT_SECRET
} = require("../config.json");
const page = require("./page");

const expressServer = express();
const key = fs.readFileSync(KEY_PATH);
const cert = fs.readFileSync(CERT_PATH);

const root = __dirname.includes("build")
	? __dirname.split("build")[0]
	: __dirname;

const renderSite = (request, response, next) => {
	page(request)
		.then(html => {
			response.end(html);
		})
		.catch(err => {
			if (err.name === "Page not found") {
				response.end("<h1>404</h1>");
			}
		});
};

const httpServer = http2
	.createServer(
		{
			key,
			cert
		},
		expressServer
	)
	.listen(HTTP_PORT, "0.0.0.0", () => {
		console.log(
			"Server is listening on",
			"https://" +
				httpServer.address().address +
				":" +
				httpServer.address().port
		);
		console.log("You can now open the URL in the browser.");
	});

//compress all the things
expressServer.use(compression());

//every other request should be routed by react
expressServer.use("/assets/", express.static(path.join(root, "assets")));

//the service worker should be able to act on the root directory
expressServer.get("/service-worker.js", (request, response) => {
	response.sendFile(path.join(root, "assets/service-worker.js"));
});

//in order to make oauth work we need to provide a callback endpoint
expressServer.get("/oauth-callback", (request, response) => {
	if (!request.query.code) {
		return response.redirect("/");
	}

	return promiseRequest({
		url: API_URL + "/oauth2/token",
		method: "POST",
		json: {
			clientId: CLIENT_ID,
			clientSecret: CLIENT_SECRET,
			code: request.query.code,
			grant_type: "authorization_code"
		}
	})
		.then((response, body) => {
			if (!error && response.statusCode === 200) {
				return Promise.resolve(body.json());
			}
		})
		.then(({ access_token: token }) => {
			response.end(
				`<!DOCTYPE html>
				<html>
					<head>
						<script>
							if(typeof(Storage) !== "undefined"){
								localStorage.setItem("access-token", ${JSON.stringify(token)});
								window.location = "/";
							}else{
								//TODO maybe fallback to cookies?
								alert("Your browser doesn't seem to support local storage");
							}
						</script>
					</head>
					<body>
						<noscript><h1>Please enable javascript!</h1></noscript>
					</bod>
				</html>
				`
			);
		})
		.catch(error => {
			console.log(error);
			return response.redirect("/?error=true");
		});
});

if (process.env.NODE_ENV === "development") {
	const webpack = require("webpack");
	const webpackConfig = require("../webpack.config");
	const compiler = webpack(webpackConfig);

	expressServer.use(
		require("webpack-dev-middleware")(compiler, {
			publicPath: webpackConfig.output.publicPath
		})
	);

	expressServer.use(require("webpack-hot-middleware")(compiler));

	expressServer.get("*", (request, response) => {
		return renderSite(request, response);
	});
} else if (process.env.NODE_ENV === "production") {
	//the bundle is also placed in the root directory
	expressServer.get("/bundle.js", (request, response) => {
		response.sendFile(path.join(__dirname, "frontend/bundle.js"));
	});

	//Store bundle.js code in RAM for faster access
	const code = fs.readFileSync(path.resolve(__dirname, "frontend/bundle.js"));

	expressServer.get("*", (request, response) => {
		//check whether the browser supports push
		if (response.push) {
			//Push the bundle to the client as fast as possible
			const stream = response.push("/bundle.js", {
				status: 200,
				method: "GET",
				request: {
					accept: "*/*"
				},
				response: {
					"Content-Type": "application/javascript"
				}
			});

			stream.on("error", err => {
				console.log(err);
			});

			stream.end(code);
		}

		return renderSite(request, response);
	});
}
