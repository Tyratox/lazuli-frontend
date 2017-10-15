import React from "react";
import styled from "styled-components";

import { Flex, Box } from "grid-styled";

import Login from "./pages/Login";

import Sidebar from "./components/ui/Sidebar";
import Dashboard from "./pages/Dashboard";

const ShadowBox = styled(Box)`
	z-index: 1000;
	box-shadow: 2px 0 1px 0 rgba(0, 0, 0, 0.1);
`;

export default [
	{
		path: "",
		action: () => {
			return { title: "Lazuli – Login", component: <Login /> };
		}
	},
	{
		path: "/dashboard",
		action: ({ next }) => {
			return next().then(({ title, component }) => {
				return {
					title,
					component: (
						<Flex>
							<ShadowBox width={1 / 4}>
								<Sidebar />
							</ShadowBox>
							<Box width={3 / 4}>{component}</Box>
						</Flex>
					)
				};
			});
		},
		children: [
			{
				path: "",
				action() {
					return { title: "Lazuli – Dashboard", component: <Dashboard /> };
				}
			}
		]
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
