import createBrowserHistory from "history/createBrowserHistory";

const history = typeof window !== "undefined" ? createBrowserHistory() : {};

export default history;
