import { api } from "./apiService";

function getTokenFromCookie() {
	const cookies = document.cookie.split(";");
	for (let cookie of cookies) {
		const [key, value] = cookie.trim().split("=");
		if (key === "token") {
			return value;
		}
	}
	return null;
}

export default function updateTokenFromCookies() {
	const token = getTokenFromCookie();
	if (token) {
		api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	}
}
