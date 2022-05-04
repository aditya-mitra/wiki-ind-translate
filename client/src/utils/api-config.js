import axios from "axios";
import { configure } from "axios-hooks";

export function configureAxios() {
	const BACKEND_URL = "http://localhost:8000/api/v1";
	// const BACKEND_URL = "https://wiki-ind-translate.herokuapp.com/api/v1";

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
