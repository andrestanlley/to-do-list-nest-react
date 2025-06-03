import { api } from "../apiService";

interface ILogin {
	email: string;
	password: string;
}

export default async function doLogin({ email, password }: ILogin) {
	const response = await api.post("/auth/login", {
		email,
		password,
	});

	const token = response.data.accessToken;
	api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	document.cookie = `token=${token}; path=/; secure`;
	return response;
}
