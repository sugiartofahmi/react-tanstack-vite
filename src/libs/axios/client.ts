import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { cookies } from "#/libs/auth/cookies.ts";

const configAPI: AxiosRequestConfig = {
	baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3100/api/v1",
};

export const api = axios.create(configAPI);

api.interceptors.request.use((config) => {
	const token = cookies.getAccessToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		const requestUrl = error.config?.url || "";
		const isAuthEndpoint =
			requestUrl.startsWith("/auth/login") ||
			requestUrl.startsWith("/auth/register");

		if (
			error.response?.status === 401 &&
			!isAuthEndpoint &&
			typeof window !== "undefined"
		) {
			cookies.clearAccessToken();
			window.location.href = "/login";
		}
		return Promise.reject(error);
	},
);
