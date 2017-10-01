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

import { API_URL } from "../../config.json";

/**
 * Creates a set of helper methods for working with REST and/or GraphQL APIs.
 */
const create = ({ baseUrl = API_URL, headers = {} }) => {
	// Default options for the Fetch API
	// https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch
	const defaults = {
		mode: baseUrl ? "cors" : "same-origin",
		credentials: baseUrl ? "include" : "same-origin",
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
			fetch(`${baseUrl}/graphql`, {
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

export default { create };
