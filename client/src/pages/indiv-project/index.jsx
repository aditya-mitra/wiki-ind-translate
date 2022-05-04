import { Fragment } from "preact";
import { useState } from "preact/hooks";
import {
	Button,
	Badge,
	Divider,
	Grid,
	Group,
	Paper,
	Text,
	Textarea,
	useMantineTheme,
} from "@mantine/core";
import useAxios from "axios-hooks";
import { useNavigate, useParams } from "react-router-dom";
import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";

import { BarLoader } from "../../components/loader";
import { showErrorNotification } from "../../utils/show-notification";
import { languageSelections } from "../../utils/language-choices";

function Sentence({ sentenceData, updateTranslation, lang }) {
	const [translated, setTranslated] = useState(sentenceData.translated);

	return (
		<Fragment key={sentenceData.id}>
			<Grid.Col>
				<Divider variant={"dashed"} />
			</Grid.Col>
			<Grid.Col span={1}>
				<Paper shadow="xs" radius="xs" p="xs">
					<Text>{sentenceData.original}</Text>
				</Paper>
			</Grid.Col>
			<Grid.Col span={1}>
				<ReactTransliterate
					renderComponent={(props) => (
						<Textarea
							placeholder="Enter the translation here ..."
							radius="md"
							autosize
							{...props}
						/>
					)}
					value={translated}
					onChangeText={(text) => setTranslated(text)}
					lang={lang}
				/>
			</Grid.Col>
			<Grid.Col span={2}>
				<Button
					fullWidth
					variant="outline"
					onClick={() =>
						updateTranslation(sentenceData.id, translated)
					}
				>
					Add Translation
				</Button>
			</Grid.Col>
			<Grid.Col>
				<Divider variant={"dashed"} />
			</Grid.Col>
		</Fragment>
	);
}

export function IndivProject() {
	const navigate = useNavigate();
	const theme = useMantineTheme();
	const { projectId } = useParams();
	const [
		{ data: projectData, loading, error: projectError },
		refetchProject,
	] = useAxios(`/projects/${projectId}`);

	if (loading || projectError) {
		if (projectError && projectError.response.status === 404) {
			navigate("/404");
			return;
		} else if (projectError) {
			showErrorNotification(projectError);
		}
		return <BarLoader />;
	}

	const [{ error: translationError }, patchTranslation] = useAxios(
		"/sentences/id",
		{
			manual: true,
		}
	);

	if (translationError) {
		showErrorNotification(translationError);
	}

	const updateTranslation = (sentenceId, translated) => {
		console.log(sentenceId, "-- and --", translated);
		patchTranslation({
			url: "/sentences/" + sentenceId,
			method: "PATCH",
			data: { translated },
		}).then(() => refetchProject());
	};

	return (
		<>
			<Group
				position="apart"
				style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
			>
				<Text weight={800}>{projectData.wiki_title}</Text>
				<Button variant={"default"} onClick={refetchProject}>
					Reload Project Data
				</Button>
				<Badge color="pink" variant="light">
					{projectData.target_lang}
				</Badge>
			</Group>
			<Grid columns={2}>
				<Grid.Col>
					<Divider variant={"dashed"} />
				</Grid.Col>
				<Grid.Col span={1} style={{ textAlign: "center" }}>
					<Text underline weight={500}>
						Original
					</Text>
				</Grid.Col>
				<Grid.Col span={1} style={{ textAlign: "center" }}>
					<Text underline weight={500}>
						Translation
					</Text>
				</Grid.Col>
				{(!projectData.sentences ||
					projectData.sentences.length === 0) && (
					<Grid.Col>
						<Paper
							shadow="md"
							radius="md"
							p="md"
							withBorder
							sx={(theme) => ({
								backgroundColor: theme.colors.grape,
							})}
						>
							<Text weight={900}>
								No sentences found. It seems you have entered an
								invalid Wikipedia Topic.
							</Text>
						</Paper>
					</Grid.Col>
				)}
				{Array.isArray(projectData.sentences) &&
					projectData.sentences.map((sentence) => (
						<Sentence
							sentenceData={sentence}
							updateTranslation={updateTranslation}
							lang={languageSelections[projectData.target_lang]}
						/>
					))}
			</Grid>
		</>
	);
}
