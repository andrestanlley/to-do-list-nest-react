import { api } from "./apiService";

interface ILogin {
	email: string;
	password: string;
}

export default async function doLogin({ email, password }: ILogin) {
	try {
		const { data } = await api.post("/auth/login", {
			email,
			password,
		});

		const token = data.accessToken;
		api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		document.cookie = `token=${token}; path=/; secure`;
		return data;
	} catch (error) {
		console.log("Erro ao fazer login");
	}
}
