import { api } from "./apiService";

export default async function getBoardsByUser() {
	return await api.get("/boards");
}
