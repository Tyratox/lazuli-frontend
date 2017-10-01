import React from "react";

import App from "./App.jsx";

export default [
	{
		path: "",
		action: () => {
			return { title: "Home", component: <App /> };
		}
	}
	/*{
		path: "/posts",
		action: () => console.log("checking child routes for /posts"),
		children: [
			{
				path: "", // optional, matches both "/posts" and "/posts/"
				action: () => <h1>Posts</h1>
			},
			{
				path: "/:id",
				action: context => <h1>Post #{context.params.id}</h1>
			}
		]
	}*/
];
