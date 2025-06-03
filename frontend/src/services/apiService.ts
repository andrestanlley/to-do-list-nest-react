import axios from "axios";

export const api = axios.create({
	baseURL: `${import.meta.env.VITE_BACKEND_URL || 'http://api:3000'}/api/v1`,
	headers: {
		"Content-Type": "application/json",
	},
});
