import { useState } from "preact/hooks";
import { useForm } from "@mantine/hooks";
import {
	Group,
	Button,
	Paper,
	Text,
	InputWrapper,
	Input,
	LoadingOverlay,
	useMantineTheme,
	NativeSelect,
} from "@mantine/core";

import { languageSelections } from "../../utils/language-choices";

export function CreateNewProject({ noShadow, noPadding }) {
	const [loading, setLoading] = useState(false);
	const theme = useMantineTheme();

	const form = useForm({
		initialValues: {
			wikiTitle: "",
			targetLang: "",
		},

		validationRules: {
			wikiTitle: (value) => value.length > 0,
			targetLang: (value) => value.length > 0,
		},
	});

	const handleSubmit = () => {
		if (!form.validate()) {
			return;
		}

		console.log(form.values);

		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 3000);
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
						{...form.getInputProps("wikiTitle")}
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
						{...form.getInputProps("targetLang")}
					/>
				</InputWrapper>

				<Group position="apart" mt="xl">
					<Button color="blue" type="submit">
						Create!
					</Button>
				</Group>
			</form>
		</Paper>
	);
}
