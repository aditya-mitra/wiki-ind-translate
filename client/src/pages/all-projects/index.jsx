import { Text, Paper, Stack, Button, Grid, Center } from "@mantine/core";
import useAxios from "axios-hooks";
import { Link } from "react-router-dom";

import { clientRoutes } from "../../utils/client-routes";
import { BarLoader } from "../../components/loader";
import { showErrorNotification } from "../../utils/show-notification";

export function AllProjects() {
	const [{ data: projects, loading, error }] = useAxios("/projects");

	if (loading || error) {
		if (error) {
			showErrorNotification(error);
		}
		return <BarLoader />;
	}

	return (
		<>
			<Stack
				sx={(theme) => ({
					backgroundColor:
						theme.colorScheme === "dark"
							? theme.colors.dark[8]
							: theme.colors.gray[0],
					height: 300,
				})}
			>
				{Array.isArray(projects) &&
					projects.map(({ id, wiki_title, target_lang }) => (
						<Paper
							shadow="md"
							radius="md"
							p="md"
							withBorder
							key={id}
						>
							<Grid columns={8}>
								<Grid.Col span={3}>
									<Center>
										<Text weight={700}>{wiki_title}</Text>
									</Center>
								</Grid.Col>
								<Grid.Col span={1}>
									<Center>
										<Text>
											<em>{target_lang}</em>
										</Text>
									</Center>
								</Grid.Col>
								<Grid.Col span={4}>
									<Center>
										<Button
											variant={"subtle"}
											component={Link}
											to={
												clientRoutes.indivProject +
												"/" +
												id
											}
										>
											Open Page
										</Button>
									</Center>
								</Grid.Col>
							</Grid>
						</Paper>
					))}
			</Stack>
		</>
	);
}
