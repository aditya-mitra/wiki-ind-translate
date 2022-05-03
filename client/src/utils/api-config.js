import axios from "axios";
import { configure } from "axios-hooks";

export function configureAxios() {
	const BACKEND_URL = "http://127.0.0.1:8000/api/v1";

	const instance = axios.create({
		baseURL: BACKEND_URL,
	});

	configure({
		axios: instance,
		defaultOptions: {
			autoCancel: true,
			manual: false,
			ssr: false,
			useCache: false,
		},
	});
}
