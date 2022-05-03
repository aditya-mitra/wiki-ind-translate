import { showNotification } from "@mantine/notifications";

/**
 * @param {import('axios').AxiosError} error
 */
export function showErrorNotification(error) {
	if (error.response.status === 404) {
		showNotification({ message: error.message });
		return;
	}

	showNotification({
		title: error.response.status,
		message: JSON.stringify(error.response.data),
	});
}
