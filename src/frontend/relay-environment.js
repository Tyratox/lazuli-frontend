import fetch from "isomorphic-fetch";
import {
	Environment,
	Network,
	RecordSource,
	Store,
	fetchQuery,
	commitMutation,
	commitLocalUpdate
} from "relay-runtime";

import { GRAPHQL_ENDPOINT } from "../../server-config.json";

/**
 * Creates a set of helper methods for working with REST and/or GraphQL APIs.
 */
const create = ({ endpoint = GRAPHQL_ENDPOINT, headers = {} }) => {
	// Default options for the Fetch API
	// https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
	const defaults = {
		mode: endpoint.startsWith("/") ? "same-origin" : "cors",
		credentials: endpoint.startsWith("/") ? "same-origin" : "include",
		headers: {
			...headers,
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	};

	// Configure Relay environment
	const environment = new Environment({
		handlerProvider: null,
		network: Network.create((
			operation,
			variables /* cacheConfig, uploadables */
		) =>
			fetch(endpoint, {
				...defaults,
				method: "POST",
				body: JSON.stringify({
					query: operation.text, // GraphQL text from input
					variables
				}),
				headers: {
					...defaults.headers,
					...(options && options.headers)
				}
			}).then(body => body.json())
		),
		store: new Store(new RecordSource())
	});

	return {
		environment,
		fetch: (url, options) =>
			fetch(`${baseUrl}${url}`, {
				...defaults,
				...options,
				headers: {
					...defaults.headers,
					...(options && options.headers)
				}
			}),
		fetchQuery: fetchQuery.bind(undefined, environment),
		commitMutation: commitMutation.bind(undefined, environment),
		commitLocalUpdate: commitLocalUpdate.bind(undefined, environment)
	};
};

let accessToken = localStorage.getItem("access-token");

if (accessToken) {
	accessToken = JSON.parse(accessToken);

	if (accessToken.expires < Date.now()) {
		//logout
		localStorage.setItem("access-token", "");
		accessToken = false;
	}
}

export default create({
	headers: accessToken ? { Authorization: "Bearer " + accessToken.token } : {}
});
