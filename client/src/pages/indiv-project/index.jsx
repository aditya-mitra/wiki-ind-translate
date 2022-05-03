import { Fragment } from "preact";
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
import { useParams } from "react-router-dom";
import { useRef } from "preact/hooks";

import { BarLoader } from "../../components/loader";

function Sentence({ sentenceData, updateTranslation }) {
	const ref = useRef();

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
				<Textarea
					placeholder="Enter the translation here ..."
					radius="md"
					autosize
					defaultValue={sentenceData.translated}
					ref={ref}
				/>
			</Grid.Col>
			<Grid.Col span={2}>
				<Button
					fullWidth
					variant="outline"
					onClick={() =>
						updateTranslation(sentenceData.id, ref.current.value)
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
	const theme = useMantineTheme();
	const { projectId } = useParams();
	const [
		{ data: projectData, loading, error: projectError },
		refetchProject,
	] = useAxios(`/projects/${projectId}`);

	if (loading || projectError) {
		return <BarLoader />;
	}

	const [{ translationError }, patchTranslation] = useAxios("/sentences/id", {
		manual: true,
	});

	const updateTranslation = (sentenceId, translated) => {
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
				{Array.isArray(projectData.sentences) &&
					projectData.sentences.map((sentence) => (
						<Sentence
							sentenceData={sentence}
							updateTranslation={updateTranslation}
						/>
					))}
			</Grid>
		</>
	);
}
