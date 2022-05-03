import { useState, useEffect } from "preact/hooks";
import { useForm } from "@mantine/hooks";
import {
	Group,
	Button,
	Paper,
	InputWrapper,
	Input,
	LoadingOverlay,
	useMantineTheme,
	NativeSelect,
} from "@mantine/core";
import useAxios from "axios-hooks";
import { useNavigate } from "react-router-dom";

import { languageSelections } from "../../utils/language-choices";
import { showErrorNotification } from "../../utils/show-notification";
import { clientRoutes } from "../../utils/client-routes";

export function CreateNewProject({ noShadow, noPadding }) {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const theme = useMantineTheme();

	const [{ data: apiData, error: apiError }, postApiData] = useAxios(
		"/projects",
		{ manual: true }
	);

	useEffect(() => {
		if (apiError) {
			showErrorNotification(apiError);
		}
	}, [apiError]);

	useEffect(() => {
		if (apiData) {
			navigate(clientRoutes.indivProject + "/" + apiData.id);
		}
	}, [apiData, navigate]);

	const form = useForm({
		initialValues: {
			wiki_title: "",
			target_lang: "",
		},

		validationRules: {
			wiki_title: (value) => value.length > 0,
			target_lang: (value) =>
				Object.keys(languageSelections).some((lng) => lng === value),
		},
	});

	const handleSubmit = () => {
		if (!form.validate()) {
			return;
		}

		setLoading(true);

		const data = {
			...form.values,
			target_lang: languageSelections[form.values.target_lang],
		};

		postApiData({ method: "POST", data });
	};

	return (
		<Paper
			p={noPadding ? 0 : "lg"}
			shadow={noShadow ? null : "sm"}
			style={{
				position: "relative",
				backgroundColor:
					theme.colorScheme === "dark"
						? theme.colors.dark[7]
						: theme.white,
			}}
		>
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<LoadingOverlay visible={loading} />

				<InputWrapper
					id="wiki-title-input"
					required
					label="Wikipedia Article Title"
					description="Please enter a valid Wikipedia Article Title."
				>
					<Input
						id="wiki-title-input"
						placeholder="Boat"
						{...form.getInputProps("wiki_title")}
					/>
				</InputWrapper>

				<InputWrapper
					id="translate-lang-select"
					required
					label="Translation Language"
					description="The language this project will be translated into"
				>
					<NativeSelect
						data={Object.keys(languageSelections)}
						placeholder="Pick One"
						{...form.getInputProps("target_lang")}
					/>
				</InputWrapper>

				<Group position="apart" mt="xl">
					<Button color="blue" type="submit">
						Create
					</Button>
				</Group>
			</form>
		</Paper>
	);
}
