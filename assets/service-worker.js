const cacheKeys = {
	index: {
		version: "1.0.0",
		files: ["/"]
	},
	bundle: {
		version: "1.0.0",
		files: ["/bundle.js"]
	},
	offline: {
		version: "1.0.0",
		files: ["/offline"]
	},
	static: {
		version: "1.0.0",
		files: []
	}
};
const versionKeys = Object.keys(cacheKeys);

const updateCache = name => {
	return caches.open(name + "-" + cacheKeys[name].version).then(cache => {
		return cache.addAll(cacheKeys[name].files);
	});
};

self.addEventListener("install", event => {
	event.waitUntil(
		Promise.all(
			versionKeys.map(key => {
				return updateCache(key);
			})
		)
	);
});

self.addEventListener("activate", event => {
	event.waitUntil(
		caches.keys().then(keys => {
			return Promise.all(
				keys
					.filter(key => {
						const versionKey = versionKeys.filter(k =>
							key.endsWith("-" + k)
						)[0];

						if (versionKey) {
							return (
								key !== versionKey[0] + "-" + cacheKeys[versionKey[0]].version
							); //if not the same, delete
						} else {
							return true; //delete it
						}
					})
					.map(key => {
						return caches.delete(key);
					})
			);
		})
	);
});

//intercept network requests
self.addEventListener("fetch", event => {
	const request = event.request;

	//for now intercepting GET requests is enough
	if (request.method !== "GET") {
		event.respondWith(
			fetch(request, { credentials: "include" }).catch(() => {
				return caches.match("/offline");
			})
		);
		return;
	}

	//first we check the cache and then try to make a request
	return event.respondWith(
		caches
			.match(request)
			.then(response => {
				return response || fetch(request, { credentials: "include" });
			})
			.then(response => {
				const versionKey = versionKeys.filter(key => {
					return cacheKeys[key].files.indexOf(request.url);
				})[0];

				if (versionKey) {
					const copy = response.clone();

					caches.open(cacheKey[versionKey].version + versionKey).then(cache => {
						cache.put(request, copy);
					});
				}

				return response;
			})
			.catch(() => {
				if (request.headers.get("Accept").indexOf("text/html") !== -1) {
					return caches.match("/offline");
				} else if (request.headers.get("Accept").indexOf("image") !== -1) {
					return new Response("<svg></svg>", {
						headers: { "Content-Type": "image/svg+xml" }
					});
				}
			})
	);
});
